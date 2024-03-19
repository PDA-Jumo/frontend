import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./page.css";
import { login, signup } from "../../../lib/apis/auth";
import character1 from "./character1.png";
import character2 from "./character2.png";
import character3 from "./character3.png";
import character4 from "./character4.png";
import character5 from "./character5.png";

// 예시 이미지 주소 배열
const images = [character1, character2, character3, character4, character5];

export default function SignUpPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [showImages, setShowImages] = useState(false);
  const navigate = useNavigate();

  const onInputChange = useCallback((inputText, setFn) => {
    setFn(inputText);
  }, []);

  const onRegisterSubmit = useCallback(
    (email, password, nickname, profile_img) => {
      // signup 함수 로직 구현 필요
      signup({ email, password, nickname, profile_img }).then((data) => {
        console.log(data);
      });
      navigate("/signin");
      // 예시로 console.log를 사용했으나, 실제로는 여기에 회원가입 로직을 구현해야 합니다.
    },
    []
  );

  return (
    <div className="container">
      <Modal
        isOpen={showImages}
        onRequestClose={() => setShowImages(false)}
        contentLabel="프로필 사진 선택"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>프로필 사진을 입력하세요</h2>
        <div className="image-options">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Profile ${index + 1}`}
              onClick={() => {
                setUserImage(image);
                setShowImages(false);
              }}
            />
          ))}
        </div>
      </Modal>

      <div className="form-container">
        <h3>Register</h3>

        {/* 프로필 사진 선택 */}
        <div
          className="profile-image-selector"
          onClick={() => setShowImages(true)}
        >
          {userImage ? (
            <img
              src={userImage}
              alt="Selected profile"
              className="selected-image"
            />
          ) : (
            <button className="image-select-button">
              프로필 사진을 선택하세요
            </button>
          )}
        </div>

        {/* 기본 회원가입 양식 */}
        <label htmlFor="emailInput">Email address</label>
        <input
          id="emailInput"
          type="email"
          onChange={(e) => onInputChange(e.target.value, setUserEmail)}
          placeholder="name@example.com"
          required
        />

        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          onChange={(e) => onInputChange(e.target.value, setUserPassword)}
          placeholder="Password"
          required
        />

        <label htmlFor="nicknameInput">Nickname</label>
        <input
          id="nicknameInput"
          type="text"
          onChange={(e) => onInputChange(e.target.value, setUserNickname)}
          placeholder="별명을 입력하여 주세요."
          required
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            onRegisterSubmit(userEmail, userPassword, userNickname, userImage);
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
