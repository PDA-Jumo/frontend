import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";
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
      // async 키워드를 추가하여 비동기 함수임을 명시합니다.
      try {
        const resp = await login({ email, password }); // await을 사용하여 비동기 로그인 함수의 완료를 기다립니다.
        const userData = resp.data;

        if (userData) {
          await clientLogin(userData); // 클라이언트 측 로그인 처리
          const action = loginAction(userData);
          console.log(action);
          dispatch(action);
          navigate("/home"); // 모든 처리가 완료된 후 홈으로 이동
        }
      } catch (error) {
        console.error(error); // 에러 처리
        // 필요하다면 에러에 대한 추가적인 처리를 여기에 작성할 수 있습니다.
      }
    },
    [dispatch, navigate, clientLogin] // 의존성 배열에 포함된 항목들
  );

  const onHandleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div style={{ width: "100%", maxWidth: "640px" }}>
        <h3 style={{ alignSelf: "start" }}>Login</h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              onInputChange(e.target.value, setUserEmail);
            }}
            value={userEmail}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => {
              onInputChange(e.target.value, setUserPassword);
            }}
            value={userPassword}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          className="w-100 btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onSubmitLogin(userEmail, userPassword);
          }}
        >
          로그인
        </button>
        <button
          className="w-100 btn btn-secondary mt-3"
          onClick={onHandleSignUpClick}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
