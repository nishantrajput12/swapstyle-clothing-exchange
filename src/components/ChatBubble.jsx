import { useAuth } from '../context/AuthContext';

export default function ChatBubble({ message }) {
  const { user } = useAuth();
  const isMe = message.senderId === user.id;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
        isMe
          ? 'bg-primary-600 text-white rounded-br-md'
          : 'bg-gray-100 text-gray-800 rounded-bl-md'
      }`}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className={`text-xs mt-1 ${isMe ? 'text-primary-200' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
