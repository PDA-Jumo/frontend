import React, { useEffect, useState } from "react";
// import axios from "axios";
import socketEvent from "../../lib/socket/CommunitySocketEvents";
import { format } from "date-fns";

import "../../styles/community.css";
import "../../styles/globalStyle.css";

export default function CommunityDetail({ community, onBack }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { stock_code, stock_name } = community;

  const user = {
    user_id: 8,
    nickname: "가람",
    profile_img: "",
    password: "",
    cash: "",
    total_assets: "",
    level: "",
    type: "",
  };

  // socket
  useEffect(() => {
    // 종목 커뮤니티 입장
    socketEvent.joinRoom(stock_code, user.user_id);

    // 이전 내용 로드
    socketEvent.onLoadPreviousMessages((m) => {
      setMessages(m);
    });

    // 메시지 수신
    socketEvent.onMessageReceived((nm) => {
      console.log("NEW MESSAGE");
      setMessages((pm) => [nm, ...pm]);
    });

    return () => {
      socketEvent.leaveRoom(stock_code, user.user_id);
    };
  }, [stock_code, user.user_id]);

  // 메시지 발신
  const sendMessages = () => {
    const createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    if (message.trim() !== "") {
      socketEvent.sendMessage({
        user_id: user.user_id,
        stock_code,
        stock_name,
        nickname: user.nickname,
        message,
        created_at: createdAt,
      });
      setMessage("");
    }
  };

  // 메시지 전송 이벤트 핸들러 내에서 sendSocketMessage 호출
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 기본 이벤트 방지 (엔터로 인한 줄바꿈 방지)
      sendMessages();
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // 채팅 메시지 렌더링 함수
  const renderChatMessage = (chat) => {
    const isMyMessage = chat.user_id === user.user_id;

    return (
      <div
        key={chat.chat_id}
        className={`chatMessage ${isMyMessage ? "myMessage" : "otherMessage"}`}
      >
        <div className="messageInfo">
          {!isMyMessage && <span className="nickname">{chat.nickname}</span>}
          <span className="createdAt">
            {new Date(chat.created_at).toLocaleTimeString()}
          </span>
        </div>
        <div className="messageContent">{chat.content}</div>
      </div>
    );
  };

  return (
    <>
      <div className="communityBox">
        <button onClick={onBack}>뒤로 가기</button>
        <div>
          <span className="communityName">{stock_name}</span>
          <span>{stock_code}</span>
        </div>
        <div className="chatBox">
          {[...messages].reverse().map(renderChatMessage)}
        </div>
        {/* 채팅 입력창 */}
        <div className="chatInputBox">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="chatInput"
          />
          <button onClick={sendMessages} className="sendButton">
            전송
          </button>
        </div>
      </div>
    </>
  );
}
