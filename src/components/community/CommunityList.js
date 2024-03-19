import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 import 합니다.
import "../../styles/community.css";
import "../../styles/globalStyle.css";

export default function CommunityList({ onSelectCommunity }) {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get("/community/");
        setCommunities(response.data);
      } catch (error) {
        console.error(
          "커뮤니티 데이터를 불러오는 중 에러가 발생했습니다.",
          error
        );
      }
    };

    fetchCommunities();
  }, []);

  return (
    <>
      <div className="communityBox">
        <div className="communityName">졸부 게시판</div>
        <div className="communityList">
          {communities.map((community) => (
            <div
              key={community.stock_code}
              onClick={() => onSelectCommunity(community)}
              className="communityButton"
            >
              {community.stock_name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
