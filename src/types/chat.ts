export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  status: 'online' | 'offline' | 'away';
  created_at: string;
  updated_at: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
  created_by: string | null;
  is_private: boolean;
  created_at: string;
  member_count?: number;
}

export interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface RoomMember {
  id: string;
  room_id: string;
  user_id: string;
  joined_at: string;
  role: 'admin' | 'moderator' | 'member';
  profile?: Profile;
}