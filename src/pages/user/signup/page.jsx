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
import hat from "../../../assets/user/Title.png";

import { useEffect } from "react";

const images = [character1, character2, character3, character4, character5];

Modal.setAppElement("#root");

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
      signup({ email, password, nickname, profile_img }).then((data) => {
        console.log(data);
      });
      navigate("/signin");
    },
    [navigate]
  );
  return (
    <div className="centered-container">
      <div className="rounded-rectangle2">
        <div className="hat-section">
          <img src={hat} alt="Hat" className="hat-image" />
        </div>
        <div className="container-split">
          <div className="image-selection-area">
            <div
              className="profile-image-selector"
              onClick={() => setShowImages(true)}
            >
              {userImage === "" ? (
                <div
                  className="selected-image-placeholder"
                  style={{ textAlign: "center", color: "#a5a5a5" }}
                >
                  프로필 캐릭터를 설정하려면
                  <br />
                  클릭해주세요
                </div>
              ) : (
                <img
                  src={userImage}
                  alt="Selected profile"
                  className="selected-image"
                />
              )}
            </div>
            <Modal
              isOpen={showImages}
              onRequestClose={() => setShowImages(false)}
              contentLabel="프로필 사진 선택"
              className="modal modalContent"
              overlayClassName="overlay"
            >
              <h2 style={{ marginBottom: "36px", fontSize: "36px" }}>
                프로필 사진을 선택하세요
              </h2>
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
                    className="selectable-image"
                  />
                ))}
              </div>
            </Modal>
          </div>
          <div className="form-area">
            <div className="form-group1">
              <div className="form-floating mb-3">
                <label htmlFor="floatingNickname" className="label-custom">
                  닉네임
                </label>
                <input
                  type="text"
                  className="form-control custom-input2"
                  id="floatingNickname"
                  placeholder="닉네임을 입력해주세요.(최대 6글자)"
                  onChange={(e) =>
                    onInputChange(e.target.value, setUserNickname)
                  }
                  value={userNickname}
                  required
                />
              </div>

              <div className="form-floating mb-3">
                <label htmlFor="floatingInput" className="label-custom">
                  이메일
                </label>
                <input
                  type="email"
                  className="form-control custom-input2"
                  id="floatingInput"
                  placeholder="이메일을 입력해주세요."
                  onChange={(e) => onInputChange(e.target.value, setUserEmail)}
                  value={userEmail}
                  required
                />
              </div>

              <div className="form-floating mb-3">
                <label htmlFor="floatingPassword" className="label-custom">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="form-control custom-input2"
                  id="floatingPassword"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={(e) =>
                    onInputChange(e.target.value, setUserPassword)
                  }
                  value={userPassword}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="register-button-container">
          <div
            className="button"
            onClick={(e) => {
              e.preventDefault();
              onRegisterSubmit(
                userEmail,
                userPassword,
                userNickname,
                userImage
              );
            }}
          >
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
}
