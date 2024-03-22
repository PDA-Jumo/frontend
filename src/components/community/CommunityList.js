import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 import 합니다.
import "../../styles/community.css";
import "../../styles/globalStyle.css";
import Search from "../../assets/icons/Search.png";
import { getSearchRoom } from "../../lib/apis/community";

export default function CommunityList({ onSelectCommunity }) {
  const [communities, setCommunities] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [searchlist, setSearchList] = useState([]);

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

    if (searchkeyword !== "") {
      const setData = async (keyword) => {
        //console.log(keyword);
        const resp = await getSearchRoom(keyword);
        setSearchList(resp);
        console.log("얍");
      };

      setData(searchkeyword);
    }

    fetchCommunities();
  }, [searchkeyword]);

  useEffect(() => {});

  console.log(searchkeyword);
  console.log(searchlist);

  return (
    <>
      <div className="communityBox">
        <div style={{ margin: "10% 10%" }}>
          <div className="communityName" style={{ fontSize: "48px" }}>
            졸부 게시판
          </div>
          <div className="searchbarbox">
            <input
              class="searchbar"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <img src={Search} style={{ marginRight: "15px" }}></img>
          </div>
          <div className="communityList">
            {searchkeyword === ""
              ? communities.map((community) => (
                  <div
                    key={community.stock_code}
                    onClick={() => onSelectCommunity(community)}
                    className="communityButton"
                  >
                    # {community.stock_name}
                  </div>
                ))
              : searchlist.map((item) => (
                  <div
                    key={item.stock_code}
                    className="communityButton"
                    onClick={() => onSelectCommunity(item)}
                  >
                    # {item.stock_name}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
