import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  connectSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from "../../lib/socket/CommunitySocketEvents";

import "../../styles/community.css";
import "../../styles/globalStyle.css";

export default function CommunityDetail({ community, onBack }) {
  const [chattings, setChattings] = useState([]);
  const { stock_code, stock_name } = community;
  const [message, setMessage] = useState("");
  const LIMIT = 10;
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

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(`/community/${stock_code}/${LIMIT}`);
        setChattings(response.data);
      } catch (error) {
        console.error(
          "커뮤니티 데이터를 불러오는 중 에러가 발생했습니다.",
          error
        );
      }
    };

    fetchCommunities();
  }, [stock_code]);

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

  useEffect(() => {
    connectSocket(stock_code, user.user_id, user.nickname);

    subscribeToChat((newMessage) => {
      setChattings((prevChattings) => [...prevChattings, newMessage]);
    });

    return () => {
      disconnectSocket();
    };
  }, [stock_code, user.user_id, user.nickname]);

  // 메시지 전송 함수
  const sendSocketMessage = async () => {
    if (message.trim() === "") return; // 메시지가 비어있으면 전송하지 않음

    try {
      // 메시지 전송 API 호출 예시
      await axios.post(`/community/${stock_code}`, {
        user_id: user.user_id,
        stock_name: stock_name,
        content: message,
      });

      // 소켓을 통해 메시지 전파
      sendMessage({
        stock_code,
        stock_name,
        message,
        user_id: user.user_id,
        nickname: user.nickname,
      });

      // 입력 필드 초기화
      setMessage("");
    } catch (error) {
      console.error("메시지 전송 중 에러가 발생했습니다.", error);
    }
  };

  // 메시지 전송 이벤트 핸들러 내에서 sendSocketMessage 호출
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 기본 이벤트 방지 (엔터로 인한 줄바꿈 방지)
      sendSocketMessage();
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (event) => {
    setMessage(event.target.value);
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
          {[...chattings].reverse().map(renderChatMessage)}
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
          <button onClick={sendSocketMessage} className="sendButton">
            전송
          </button>
        </div>
      </div>
    </>
  );
}
