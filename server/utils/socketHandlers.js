const Message = require("../models/Message")
const Conversation = require("../models/Conversation")
const User = require("../models/User")

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id)

    // Handle user joining their room
    socket.on("join", async (userId) => {
      try {
        socket.join(userId)
        socket.userId = userId
        console.log(`User ${userId} joined room`)

        // Update user's online status
        await User.findByIdAndUpdate(userId, { lastSeen: new Date() })

        // Notify user's contacts that they're online
        socket.broadcast.emit("user_online", { userId })
      } catch (error) {
        console.error("Error handling join:", error)
      }
    })

    // Handle private messages
    socket.on("private_message", async (data) => {
      try {
        const { receiverId, content, messageType = "text", attachments = [] } = data

        // Create and save message
        const message = new Message({
          sender: socket.userId,
          receiver: receiverId,
          content,
          messageType,
          attachments,
        })

        await message.save()
        await message.populate("sender", "name profileImage")

        // Update or create conversation
        let conversation = await Conversation.findOne({
          participants: { $all: [socket.userId, receiverId] },
        })

        if (!conversation) {
          conversation = new Conversation({
            participants: [socket.userId, receiverId],
            lastMessage: message._id,
            lastActivity: new Date(),
            unreadCount: new Map([
              [socket.userId.toString(), 0],
              [receiverId.toString(), 1],
            ]),
          })
        } else {
          conversation.lastMessage = message._id
          conversation.lastActivity = new Date()
          const currentUnread = conversation.unreadCount.get(receiverId.toString()) || 0
          conversation.unreadCount.set(receiverId.toString(), currentUnread + 1)
        }

        await conversation.save()

        // Send message to receiver
        socket.to(receiverId).emit("new_message", {
          message,
          conversationId: conversation._id,
        })

        // Confirm message sent to sender
        socket.emit("message_sent", {
          message,
          conversationId: conversation._id,
        })
      } catch (error) {
        console.error("Error handling private message:", error)
        socket.emit("message_error", { error: "Failed to send message" })
      }
    })

    // Handle typing indicators
    socket.on("typing_start", (data) => {
      socket.to(data.receiverId).emit("user_typing", {
        userId: socket.userId,
        isTyping: true,
      })
    })

    socket.on("typing_stop", (data) => {
      socket.to(data.receiverId).emit("user_typing", {
        userId: socket.userId,
        isTyping: false,
      })
    })

    // Handle message read receipts
    socket.on("mark_messages_read", async (data) => {
      try {
        const { senderId } = data

        await Message.updateMany(
          {
            sender: senderId,
            receiver: socket.userId,
            isRead: false,
          },
          {
            isRead: true,
            readAt: new Date(),
          },
        )

        // Update conversation unread count
        await Conversation.findOneAndUpdate(
          { participants: { $all: [socket.userId, senderId] } },
          {
            $set: {
              [`unreadCount.${socket.userId}`]: 0,
            },
          },
        )

        // Notify sender that messages were read
        socket.to(senderId).emit("messages_read", {
          readBy: socket.userId,
        })
      } catch (error) {
        console.error("Error marking messages as read:", error)
      }
    })

    // Handle notifications
    socket.on("send_notification", async (data) => {
      try {
        const { userId, type, title, message, actionUrl } = data

        // Send real-time notification
        socket.to(userId).emit("new_notification", {
          type,
          title,
          message,
          actionUrl,
          timestamp: new Date(),
        })
      } catch (error) {
        console.error("Error sending notification:", error)
      }
    })

    // Handle disconnection
    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id)

      if (socket.userId) {
        try {
          // Update user's last seen
          await User.findByIdAndUpdate(socket.userId, { lastSeen: new Date() })

          // Notify contacts that user went offline
          socket.broadcast.emit("user_offline", { userId: socket.userId })
        } catch (error) {
          console.error("Error handling disconnect:", error)
        }
      }
    })
  })
}

module.exports = { handleSocketConnection }
