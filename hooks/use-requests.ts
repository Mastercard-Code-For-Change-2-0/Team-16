"use client"

import { useState, useEffect } from "react"
import { api, type Request } from "@/lib/api"

export function useRequests(filters?: any) {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true)
        const data = await api.getRequests(filters)
        setRequests(data)
        console.log("[v0] Fetched requests:", data.length)
      } catch (err) {
        setError("Failed to fetch requests")
        console.error("[v0] Error fetching requests:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [filters])

  const createRequest = async (requestData: Partial<Request>) => {
    try {
      const newRequest = await api.createRequest(requestData)
      setRequests((prev) => [newRequest, ...prev])
      console.log("[v0] Created request:", newRequest.title)
      return newRequest
    } catch (err) {
      console.error("[v0] Error creating request:", err)
      throw err
    }
  }

  return {
    requests,
    loading,
    error,
    createRequest,
    refetch: () => {
      setLoading(true)
      // Refetch logic would go here
    },
  }
}
