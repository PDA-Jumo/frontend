import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 import 합니다.
import "../../styles/community.css";
import "../../styles/globalStyle.css";

export default function HotCommunityList({ onSelectCommunity }) {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get("/community/hot");
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
      <div style={{margin:"10% 10%"}}>
          <div className="xLargeText communityName">지금 Hot한 종목!</div>
          <div className="communityList">
            {communities.map((community, index) => (
              <div
                key={community.stock_code}
                onClick={() => onSelectCommunity(community)}
                className="communityButton"
              >
                <span className="communityName" style={{fontSize:"24px", marginRight:"2%"}}>{index + 1} </span>
                {community.stock_name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
