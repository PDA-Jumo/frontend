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
        <div className="hat-section" style={{ height: "96px" }}>
          <img src={hat} alt="Hat" style={{ width: "100%", height: "100%" }} />
        </div>
        <div
          className="container-split"
          style={{ display: "flex", paddingTop: "32px" }}
        >
          <div className="image-selection-area">
            <div
              className="profile-image-selector"
              onClick={() => setShowImages(true)}
            >
              {/* userImage가 비어있으면 텍스트를 보여주고, 그렇지 않으면 이미지를 보여줌 */}
              {userImage === "" ? (
                <div className="selected-image-placeholder">
                  프로필 이미지를 설정해주세요
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
              className="modal"
              overlayClassName="overlay"
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  width: "60%", // 모달 너비 조정
                  height: "80%", // 모달 높이 조정
                  transform: "translate(-50%, -50%)",
                },
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 투명도 조정
                },
              }}
            >
              <h2>프로필 사진을 선택하세요</h2>
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
                    style={{
                      width: "144px",
                      height: "144px",
                    }} // 모달 내 이미지 크기 조정
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

              <button
                className="btn btn-primary custom-login button-width"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
