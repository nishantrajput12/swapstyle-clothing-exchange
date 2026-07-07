import { useApp } from '../context/AppContext';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiX } from 'react-icons/hi';

export default function Notification() {
  const { notification, showNotification } = useApp();
  if (!notification) return null;

  const icons = {
    success: <HiCheckCircle className="text-green-500 text-xl" />,
    error: <HiExclamationCircle className="text-red-500 text-xl" />,
    info: <HiInformationCircle className="text-blue-500 text-xl" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed top-20 right-4 z-[100] animate-slide-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColors[notification.type] || bgColors.info}`}>
        {icons[notification.type] || icons.info}
        <span className="text-sm font-medium text-gray-800">{notification.message}</span>
        <button onClick={() => showNotification(null)} className="ml-2 text-gray-400 hover:text-gray-600">
          <HiX />
        </button>
      </div>
    </div>
  );
}
