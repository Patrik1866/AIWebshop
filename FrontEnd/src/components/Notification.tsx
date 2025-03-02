import { useState, useEffect } from "react";
import "../styles/notification.css";

interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return visible && (
    <div className="notification">
      <div className="header">Siker!</div>
      <div className="message">{message}</div>
    </div>
  );
};

export default Notification;