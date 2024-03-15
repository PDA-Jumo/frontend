import axios from "axios";
import React, { useEffect, useState } from "react";
// import { testAPI } from "../lib/apis/test";

export default function TestLayout() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 데이터를 불러오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get("/test");
        setData(response.data); // 응답 데이터를 상태에 저장
        setIsLoading(false); // 로딩 상태 업데이트
      } catch (error) {
        setError(error.message); // 에러 처리
        setIsLoading(false); // 로딩 상태 업데이트
      }
    };

    fetchData(); // 함수 실행
  }, []); // 빈 의존성 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 함

  if (isLoading) return <div>데이터를 불러오는 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <div>
      <h1>테스트 데이터</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
