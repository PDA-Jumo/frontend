import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletesearch } from "../../store/reducers/recentsearch";
import { SearchKeyword } from "../../lib/apis/stock";

//assets
import Trash from "../../assets/icons/Trash.png";

//css
import "../../styles/globalStyle.css";

export default function SearchDrop({ keyword }) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchList) || [];
  const [searchlist, setSearchList] = useState([{}]); //최근검색 리스트
  const [prevKeyword, setPrevKeyword] = useState(""); // 키워드 변경시에만 요청 보내도록 이전 검색어 저장
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(keyword)
    const setData = async (keyword) => {
      //console.log(keyword);
      const resp = await SearchKeyword(keyword);
      setSearchList(resp);
    };

    if (keyword !== "" && keyword !== prevKeyword) {
      setData(keyword);
      setPrevKeyword(keyword);
    }
  }, [keyword]);

  console.log(searchlist);

  return (
    <div
      style={{
        width: "420px",
        border: "2px solid black",
        borderRadius: "16px",
      }}
    >
      <div style={{ margin: "2% 5%" }} className="searchbox">
        {keyword === "" && (
          <>
            <div style={{ fontSize: "16px" }}>최근 검색</div>
            <div style={{ padding: "2% 0%" }}>
              {search.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {item.content}
                  <img
                    src={Trash}
                    style={{ width: "25px", cursor: "pointer" }}
                    onClick={() => {
                      const action = deletesearch(item.id);
                      dispatch(action);
                    }}
                  ></img>
                </div>
              ))}
            </div>
          </>
        )}
        {keyword !== "" &&
          searchlist.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`detail/${item.stock_code}`);
              }}
            >
              {item.stock_name}
            </div>
          ))}
      </div>
    </div>
  );
}
