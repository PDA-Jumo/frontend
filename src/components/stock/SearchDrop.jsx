import React, { useEffect, useState } from "react";
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
  const [searchlist, setSearchList] = useState([{}]);
  const [prevKeyword, setPrevKeyword] = useState("");

  useEffect(() => {
    //console.log(keyword)
    const setData = async (keyword) => {
      console.log(keyword);
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
        width: "480px",
        border: "3px solid black",
      }}
    >
      <div style={{ margin: "2% 5%" }} class="searchbox">
        <div class="smallText">최근 검색</div>
        <div style={{ padding: "2% 0%" }}>
          {keyword === ""
            ? search.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {item.content}
                  <img
                    src={Trash}
                    style={{ width: "30px" }}
                    onClick={() => {
                      const action = deletesearch(item.id);
                      dispatch(action);
                    }}
                  ></img>
                </div>
              ))
            : searchlist.map((item, index) => (
                <div key={index}>{item.stock_name}</div>
              ))}
        </div>
      </div>
    </div>
  );
}
