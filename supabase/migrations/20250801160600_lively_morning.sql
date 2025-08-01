/*
  # Chat Application Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `avatar_url` (text)
      - `status` (text, default 'offline')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chat_rooms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_by` (uuid, references profiles)
      - `is_private` (boolean, default false)
      - `created_at` (timestamp)
    
    - `room_members`
      - `id` (uuid, primary key)
      - `room_id` (uuid, references chat_rooms)
      - `user_id` (uuid, references profiles)
      - `joined_at` (timestamp)
      - `role` (text, default 'member')
    
    - `messages`
      - `id` (uuid, primary key)
      - `room_id` (uuid, references chat_rooms)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `message_type` (text, default 'text')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  avatar_url text,
  status text DEFAULT 'offline',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_rooms table
CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create room_members table
CREATE TABLE IF NOT EXISTS room_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  role text DEFAULT 'member',
  UNIQUE(room_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  message_type text DEFAULT 'text',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Chat rooms policies
CREATE POLICY "Users can view rooms they're members of"
  ON chat_rooms FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT room_id FROM room_members WHERE user_id = auth.uid()
    ) OR NOT is_private
  );

CREATE POLICY "Users can create rooms"
  ON chat_rooms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Room members policies
CREATE POLICY "Users can view room members for rooms they're in"
  ON room_members FOR SELECT
  TO authenticated
  USING (
    room_id IN (
      SELECT room_id FROM room_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join rooms"
  ON room_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in rooms they're members of"
  ON messages FOR SELECT
  TO authenticated
  USING (
    room_id IN (
      SELECT room_id FROM room_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages to rooms they're members of"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    room_id IN (
      SELECT room_id FROM room_members WHERE user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_room_id ON messages(room_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_room_members_room_id ON room_members(room_id);
CREATE INDEX IF NOT EXISTS idx_room_members_user_id ON room_members(user_id);

-- Create a default general room
INSERT INTO chat_rooms (name, description, is_private) 
VALUES ('General', 'Welcome to the general chat room!', false)
ON CONFLICT DO NOTHING;