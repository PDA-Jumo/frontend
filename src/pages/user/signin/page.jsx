import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";
import { login } from "../../../lib/apis/auth";
import useAuth from "../../../lib/hooks/useAuth";

export default function SignInPage() {
  const { user, clientLogin } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const onInputChange = useCallback((inputText, setFn) => {
    setFn(inputText);
  }, []);

  const onSubmitLogin = useCallback(
    (email, password) => {
      login({ email, password }).then((resp) => {
        const user = resp.data;
        if (user.token) {
          delete user.token;
          clientLogin(user);
        }
        navigate("/main");
        console.log(user);
      });
    },
    [navigate, clientLogin]
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
