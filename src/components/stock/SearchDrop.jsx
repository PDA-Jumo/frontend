import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletesearch, addsearch } from "../../store/reducers/recentsearch";
import { SearchKeyword } from "../../lib/apis/stock";
import { v4 as uuidv4 } from "uuid";
//assets
import Trash from "../../assets/icons/Trash.png";

//css
import "../../styles/globalStyle.css";

export default function SearchDrop({ keyword }) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchList) || [];
  const [searchlist, setSearchList] = useState([{}]); //연관검색어
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

  console.log(search);

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
                  onClick={() => {
                    navigate(`detail/${item.stock_code}`, { state: item });
                  }} // 페이지 이동
                >
                  <span style={{ cursor: "pointer" }}>{item.stock_name}</span>
                  <img
                    src={Trash}
                    style={{ width: "25px", cursor: "pointer" }}
                    onClick={() => {
                      const action = deletesearch(item.stock_code);
                      dispatch(action);
                      console.log(action);
                    }}
                  />
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
                navigate(`detail/${item.stock_code}`, { state: item });

                const action = addsearch({
                  id: uuidv4(),
                  content: item,
                });
                dispatch(action);
                console.log(action); //검색 기록 저장
              }}
            >
              <span style={{ cursor: "pointer" }}>{item.stock_name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
