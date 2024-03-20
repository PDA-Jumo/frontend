import React, { useEffect, useState } from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";
import { useNavigate, useLocation } from "react-router-dom";
import investType from "./investType.js";
import { testFinish } from "../../lib/apis/test";
import { useSelector, useDispatch } from "react-redux";
import { updateTypeAction } from "../../store/reducers/user";

export default function TestResultLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const [result, setResult] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || {};

  useEffect(() => {
    console.log(score);
    let index = Math.floor(score / 6);
    index = Math.min(index, investType.length - 1);
    setResult(investType[index]);
  }, [score]);

  const updateType = async (user_id, type) => {
    try {
      // 퀴즈 성공시 DB 업데이트
      const resp = await testFinish({ user_id, type });
      const data = resp.data;

      // DB 업데이트 성공시 Redux Store State 업데이트
      if (data === "성공") {
        dispatch(updateTypeAction(type));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = async () => {
    if (result.성향) {
      updateType(user.user_id, result.성향);
    }
    console.log("홈으로 버튼이 클릭되었습니다.");
    navigate("/home");
  };

  const buttonBackgroundColor = {
    안정형: "#AEF07E",
    안정추구형: "#FFEB33",
    위험중립형: "#FFAD33",
    적극투자형: "#FF8933",
    공격투자형: "#FF3D00",
  };

  const getButtonBackgroundColor = (성향) => {
    return buttonBackgroundColor[성향] || "#ffffff";
  };

  return (
    <div className="test-layout">
      <img src={character1} className="character-image" alt="Character" />
      <div className="test-content">
        <div className="test-title">투자 성향 테스트</div>
        <hr className="test-line" />

        <div className="result-container">
          <div>
            <div className="tendency-text">당신의 투자성향은</div>
            <div className="tendency-button-container">
              <button
                className="result-button"
                style={{
                  backgroundColor: getButtonBackgroundColor(result.성향),
                }}
              >
                {result.성향}
              </button>
            </div>
          </div>
          <div className="result-text">
            <div>
              <strong className="highlight">특징:</strong> {result.특징}
            </div>
            <div>
              <strong className="highlight">장점:</strong> {result.장점}
            </div>
            <div>
              <strong className="highlight">단점:</strong> {result.단점}
            </div>
            <div>
              <strong className="highlight">추천:</strong> {result.추천상품}
            </div>
          </div>
        </div>

        <button className="home-button" onClick={handleBack}>
          홈으로
        </button>
      </div>
    </div>
  );
}
