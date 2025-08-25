-- Create database
CREATE DATABASE IF NOT EXISTS donation_portal;
USE donation_portal;

-- Users table (both donors and receivers)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  user_type ENUM('donor', 'receiver') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donation items table
CREATE TABLE donation_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  quantity INT DEFAULT 1,
  status ENUM('available', 'matched', 'completed') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES users(id)
);

-- Requests table  
CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receiver_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  quantity INT DEFAULT 1,
  status ENUM('open', 'matched', 'fulfilled') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);