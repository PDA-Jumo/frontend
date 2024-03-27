import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyStockList, levelUp } from "../../lib/apis/level";
import {
  updateFinancialsAction,
  updateLevelAction,
} from "../../store/reducers/user";
import LevelUpModal from "../home/LevelUpModal";

export default function LevelComponent() {
  const user = useSelector((state) => state.user.user);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [myStockLen, setMyStockLen] = useState(0);
  const dispatch = useDispatch();

  const openByLevel = async (bonus, newLevel) => {
    try {
      const resp = await levelUp(bonus, user.user_id);
      const data = resp.data;

      if (data === "성공") {
        dispatch(updateFinancialsAction(bonus));
        dispatch(updateLevelAction(newLevel));
        setIsLevelUp(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.cash >= 10000 && user.level === 0) {
      // level 0->1
      openByLevel(100000, 1);
      // 한 종목 주식 거래 가능 -> 매수매도 아이콘 블러 처리 해야함
    } else if (user.level === 1 && myStockLen >= 1) {
      // Level 1->2
      openByLevel(0, 2);
      // 코스피 200 중 1주 랜덤 지급 해야함
    } else if (user.level === 2 && user.cash >= 200000) {
      //Level 2->3
      openByLevel(100000, 3);
    } else if (user.level === 3 && user.cash >= 400000 && myStockLen >= 3) {
      // Level 3->4
      openByLevel(0, 4);
    } else if (user.level === 4 && user.cash >= 1000000) {
      // Level 4->5
      // 투자 성향 테스트 ok
      openByLevel(0, 5);
    } else if (user.level === 5 && user.cash >= 10000000) {
      // Level 5->6
      // 해외주식 랜덤 1주 지급 해야함
      openByLevel(0, 6);
    } else if (user.level === 6 && user.cash >= 50000000) {
      // Level 6->7
      openByLevel(0, 7);
    } else if (user.level === 7) {
      // 랭킹 중 상위 5% Level 7->8
      openByLevel(0, 8);
    }
  }, [user.cash, myStockLen]);

  const getMyStockAsyncFun = async () => {
    const myStockData = await getMyStockList(user.user_id);
    setMyStockLen(myStockData.data.length);
  };

  useEffect(() => {
    getMyStockAsyncFun();
  }, []);

  return <>{isLevelUp ? <LevelUpModal setIsLevelUp={setIsLevelUp} /> : null}</>;
}
