import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletesearch } from "../../store/reducers/recentsearch";

//assets
import Trash from "../../assets/icons/Trash.png";

//css
import "../../styles/globalStyle.css";

export default function SearchDrop() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchList) || [];

  return (
    <div
      style={{
        width: "420px",
        border: "2px solid black",
        borderRadius: "16px",
      }}
    >
      <div style={{ margin: "2% 5%" }}>
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
      </div>
    </div>
  );
}
