import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFinancialsAction,
  updateLevelAction,
} from "../../store/reducers/user";
import LevelUpModal from "../home/LevelUpModal";

// 해금되는 목록 ..?
// DB level 업데이트 요청
// 레벨업 모달 뜨게하기
export default function LevelComponent() {
  const user = useSelector((state) => state.user.user);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const dispatch = useDispatch();

  const openByLevel = (bonus, newLevel) => {
    dispatch(updateFinancialsAction(bonus));
    dispatch(updateLevelAction(newLevel));
    if (!user.check[user.level]) {
      setIsLevelUp(true);
      user.check[user.level] = true;
    }
  };

  useEffect(() => {
    if (user.cash >= 10000 && user.level === 0) {
      // level 0->1
      openByLevel(100000, 1);
      // 한 종목 주식 거래 가능
    } else if (user.level === 1) {
      // 한 종목 보유 Level 1->2
      openByLevel(0, 2); //투자지원금 없음
      // 코스피 200 중 1주 랜덤
      // 실시간 인기테마, 뉴스 (정보제공)
    } else if (user.level === 2 && user.cash >= 200000) {
      //Level 2->3
      openByLevel(100000, 3);
    } else if (user.level === 3 && user.cash >= 400000) {
      // 3종류 이상의 주식으로 포트폴리오 구성, 40만원 달성
      // Level 3->4
      // 퀴즈 단가 인상
    } else if (user.level === 4 && user.cash >= 180000) {
      // Level 4->5
      openByLevel(0, 5);
      // 퀴즈 단가 인상
      // 투자 성향 테스트
    } else if (user.level === 5 && user.cash >= 10000000) {
      // Level 5->6
      // 퀴즈 단가 인상
      // 해외주식 랜덤 1주
    } else if (user.level === 6 && user.cash >= 50000000) {
      // Level 6->7
      // 커뮤니티 입장 가능
    } else if (user.level === 7) {
      // 랭킹 중 상위 5% Level 7->8
    }
  }, [user.cash]);

  useEffect(() => {
    console.log(user.level);
  }, []);

  return <>{isLevelUp ? <LevelUpModal setIsLevelUp={setIsLevelUp} /> : null}</>;
}
