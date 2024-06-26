import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";
import { login } from "../../../lib/apis/auth";
import useAuth from "../../../lib/hooks/useAuth";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../store/reducers/user";
import hat from "../../../assets/user/Title.png";
import { useEffect } from "react";

export default function SignInPage() {
  const { user, clientLogin } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000); // 3초 후 모달 닫기

      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 제거
    }
  }, [showModal]);

  const onInputChange = useCallback((inputText, setFn) => {
    setFn(inputText);
  }, []);

  const onSubmitLogin = useCallback(
    async (email, password) => {
      try {
        const resp = await login({ email, password });
        const userData = resp.data;

        if (userData) {
          await clientLogin(userData);
          const action = loginAction(userData);
          console.log(action);
          dispatch(action);
          navigate("/home");
        }
      } catch (error) {
        console.error(error);
        // 모달 관련 코드 대신 크롬의 alert를 사용
        alert("로그인에 실패하였습니다. 이메일과 패스워드를 다시 입력하세요.");
      }
    },
    [dispatch, navigate, clientLogin]
  );

  const onHandleSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <div className="centered-container">
      {showModal && (
        <div className="modal signinModal" overlayClassName="overlay">
          {/* 여기에 모달 스타일을 정의하거나 별도의 컴포넌트로 분리할 수 있습니다. */}
          {modalMessage}
        </div>
      )}
      <div className="rounded-rectangle">
        <div className="hat-section" style={{ height: "128px" }}>
          {" "}
          <img src={hat} alt="Hat" style={{ width: "100%", height: "100%" }} />
        </div>
        <div
          className="container-split"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "32px",
            alignItems: "center",
            width: "100%",
            height: "calc(100% - 96px)",
          }}
        >
          <div className="form-group">
            <div className="form-floating mb-3">
              <label htmlFor="floatingInput" className="label-custom">
                이메일
              </label>
              <input
                type="email"
                className="form-control custom-input"
                id="floatingInput"
                placeholder="이메일을 입력해주세요."
                onChange={(e) => {
                  onInputChange(e.target.value, setUserEmail);
                }}
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
                className="form-control custom-input"
                id="floatingPassword"
                placeholder="비밀번호를 입력해주세요."
                onChange={(e) => {
                  onInputChange(e.target.value, setUserPassword);
                }}
                value={userPassword}
                required
              />
            </div>
            <div className="button-group">
              <div
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitLogin(userEmail, userPassword);
                }}
              >
                로그인
              </div>
              <div className="button" onClick={onHandleSignUpClick}>
                회원가입
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
