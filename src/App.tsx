import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Auth } from './components/Auth';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatWindow } from './components/ChatWindow';

function App() {
  const { user, loading } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="h-screen flex bg-gray-900">
      <ChatSidebar
        selectedRoom={selectedRoom}
        onRoomSelect={setSelectedRoom}
      />
      
      {selectedRoom ? (
        <ChatWindow roomId={selectedRoom} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-800">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to ChatFlow</h2>
            <p className="text-gray-400">Select a room to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;