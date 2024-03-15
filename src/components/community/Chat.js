// ChatRoom.js
import React, { useState, useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from "../../lib/socket/CommunitySocketEvents";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connectSocket();

    subscribeToChat((newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <div id="messageContainer">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.userId}: {msg.text}
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={handleInputChange} />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default Chat;
