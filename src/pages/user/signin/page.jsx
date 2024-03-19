import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css"; // CSS 파일을 임포트합니다.
import { login } from "../../../lib/apis/auth";
import useAuth from "../../../lib/hooks/useAuth";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../store/reducers/user";
import hat from "../../../assets/user/Title.png";

export default function SignInPage() {
  const { user, clientLogin } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      }
    },
    [dispatch, navigate, clientLogin]
  );

  const onHandleSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <div className="centered-container">
      <div className="rounded-rectangle">
        <div className="hat-section" style={{ height: "96px" }}>
          {" "}
          {/* hat 영역 추가 */}
          <img src={hat} alt="Hat" style={{ width: "100%", height: "100%" }} />
        </div>
        <div
          className="container-split"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "48px",
            alignItems: "center",
            width: "100%",
            height: "calc(100% - 96px)",
          }} // 스타일 조정
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
              <button
                className="btn btn-primary custom-login"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitLogin(userEmail, userPassword);
                }}
              >
                로그인
              </button>
              <button
                className="btn btn-secondary custom-login"
                onClick={onHandleSignUpClick}
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
