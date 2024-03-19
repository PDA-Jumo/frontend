import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css"; // CSS 파일을 임포트합니다.
import { login } from "../../../lib/apis/auth";
import useAuth from "../../../lib/hooks/useAuth";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../store/reducers/user";

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
        <div className="form-group">
          {" "}
          {/* form-group 추가 */}
          <div className="form-floating mb-3">
            <label htmlFor="floatingInput" className="label-custom">
              이메일
            </label>
            <input
              type="email"
              className="form-control custom-input"
              id="floatingInput"
              placeholder="name@example.com"
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
              placeholder="Password"
              onChange={(e) => {
                onInputChange(e.target.value, setUserPassword);
              }}
              value={userPassword}
              required
            />
          </div>
          <div className="button-group">
            {" "}
            {/* 버튼 그룹을 위한 div 추가 */}
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onSubmitLogin(userEmail, userPassword);
              }}
            >
              로그인
            </button>
            <button className="btn btn-secondary" onClick={onHandleSignUpClick}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
