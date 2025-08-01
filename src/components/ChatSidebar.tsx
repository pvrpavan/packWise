import React, { useState, useEffect } from 'react';
import { Plus, Hash, Users, Settings, LogOut, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { ChatRoom } from '../types';

interface ChatSidebarProps {
  selectedRoom: string | null;
  onRoomSelect: (roomId: string) => void;
}

export function ChatSidebar({ selectedRoom, onRoomSelect }: ChatSidebarProps) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const { profile, signOut } = useAuth();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select(`
          *,
          room_members(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const createRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim() || !profile) return;

    try {
      const { data: room, error } = await supabase
        .from('chat_rooms')
        .insert({
          name: newRoomName,
          created_by: profile.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Add creator as member
      await supabase
        .from('room_members')
        .insert({
          room_id: room.id,
          user_id: profile.id,
          role: 'admin',
        });

      setNewRoomName('');
      setShowCreateRoom(false);
      fetchRooms();
      onRoomSelect(room.id);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">ChatFlow</h1>
          <button
            onClick={() => setShowCreateRoom(true)}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {filteredRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onRoomSelect(room.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                selectedRoom === room.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Hash className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-medium">{room.name}</div>
                {room.description && (
                  <div className="text-sm opacity-70 truncate">{room.description}</div>
                )}
              </div>
              <Users className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {profile?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-white font-medium">{profile?.username}</div>
              <div className="text-green-400 text-sm">Online</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={signOut}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-white mb-4">Create New Room</h2>
            <form onSubmit={createRoom}>
              <input
                type="text"
                placeholder="Room name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateRoom(false)}
                  className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}