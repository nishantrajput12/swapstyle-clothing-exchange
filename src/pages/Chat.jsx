import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ChatBubble from '../components/ChatBubble';
import { HiChat, HiPaperAirplane, HiArrowLeft } from 'react-icons/hi';

export default function Chat() {
  const { userId: paramUserId } = useParams();
  const { user } = useAuth();
  const { getUser, getChatPartners, getConversation, sendMessage, getLastMessage } = useApp();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const partners = getChatPartners(user.id);

  useEffect(() => {
    if (paramUserId) {
      const partner = getUser(paramUserId);
      if (partner) setSelectedUser(partner);
    }
  }, [paramUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedUser, getConversation]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;
    sendMessage(selectedUser.id, text.trim());
    setText('');
  };

  const conversation = selectedUser ? getConversation(user.id, selectedUser.id) : [];

  return (
    <div className="page-container h-[calc(100vh-140px)]">
      <h1 className="section-title flex items-center gap-3 mb-6">
        <HiChat className="text-primary-500" /> Messages
      </h1>

      <div className="card flex h-[calc(100%-5rem)] overflow-hidden">
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Conversations</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {partners.length === 0 ? (
              <div className="p-6 text-center">
                <HiChat className="text-3xl text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No conversations yet. Start by messaging someone from an item page!</p>
              </div>
            ) : (
              partners.map(pid => {
                const partner = getUser(pid);
                if (!partner) return null;
                const lastMsg = getLastMessage(user.id, pid);
                const isActive = selectedUser?.id === pid;
                return (
                  <button
                    key={pid}
                    onClick={() => setSelectedUser(partner)}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${isActive ? 'bg-primary-50 border-l-2 border-primary-500' : ''}`}
                  >
                    <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      {partner.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm">{partner.name}</p>
                      <p className="text-xs text-gray-500 truncate">{lastMsg ? lastMsg.text : 'No messages yet'}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
          {!selectedUser ? (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <HiChat className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
                <button onClick={() => setSelectedUser(null)} className="md:hidden text-gray-500">
                  <HiArrowLeft className="text-xl" />
                </button>
                <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">{selectedUser.location}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {conversation.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm mt-8">Start a conversation!</p>
                ) : (
                  conversation.map(msg => <ChatBubble key={msg.id} message={msg} />)
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="input-field flex-1"
                    autoFocus
                  />
                  <button type="submit" disabled={!text.trim()} className="btn-primary p-3">
                    <HiPaperAirplane className="text-lg" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
