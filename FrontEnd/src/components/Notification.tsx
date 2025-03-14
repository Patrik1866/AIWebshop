import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setVisible(true);
    setShouldRender(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return shouldRender && (
    <div className={`fixed top-4 right-4 z-50 max-w-md ${visible ? "enter-animation" : "leave-animation"}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-main-green-title">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 mr-3">
            <svg className="h-6 w-6 text-main-green-title" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="flex-1">
            <div className="font-bold text-main-green-title text-lg mb-1">Siker!</div>
            <div className="text-gray-700">{message}</div>
          </div>
          
          <div className="flex-shrink-0 ml-2">
            <button 
              className="text-gray-400 hover:text-gray-600 transition duration-150"
              onClick={() => setVisible(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;