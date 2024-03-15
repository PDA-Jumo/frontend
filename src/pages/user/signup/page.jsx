import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";
import { login, signup } from "../../../lib/apis/auth";
import character1 from "./character1.png";
import character2 from "./character2.png";

// 예시 이미지 주소 배열
const images = [character1, character2];

export default function SignUpPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showImages, setShowImages] = useState(false);
  const navigate = useNavigate();

  const onInputChange = useCallback((inputText, setFn) => {
    setFn(inputText);
  }, []);

  const onRegisterSubmit = useCallback((email, password, nickname, image) => {
    // signup 함수 로직 구현 필요
    console.log({ email, password, nickname, image });
    navigate("/signin");
    // 예시로 console.log를 사용했으나, 실제로는 여기에 회원가입 로직을 구현해야 합니다.
  }, []);

  return (
    <div className="container">
      <div className="form-container">
        <h3>Register</h3>

        {/* 프로필 사진 선택 */}
        <div
          className="profile-image-selector"
          onClick={() => setShowImages(!showImages)}
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Selected profile" />
          ) : (
            "프로필 사진을 선택하세요"
          )}
        </div>

        {/* 이미지 목록 표시 */}
        {showImages && (
          <div className="image-options">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Profile ${index + 1}`}
                onClick={() => {
                  setSelectedImage(image);
                  setShowImages(false);
                }}
              />
            ))}
          </div>
        )}

        {/* 기본 회원가입 양식 */}
        <label htmlFor="emailInput">Email address</label>
        <input
          id="emailInput"
          type="email"
          onChange={(e) => {
            onInputChange(e.target.value, setUserEmail);
          }}
          placeholder="name@example.com"
          required
        />

        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          onChange={(e) => {
            onInputChange(e.target.value, setUserPassword);
          }}
          placeholder="Password"
          required
        />

        <label htmlFor="nicknameInput">Nickname</label>
        <input
          id="nicknameInput"
          type="text"
          onChange={(e) => {
            onInputChange(e.target.value, setUserNickname);
          }}
          placeholder="별명을 입력하여 주세요."
          required
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            onRegisterSubmit(
              userEmail,
              userPassword,
              userNickname,
              selectedImage
            );
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
