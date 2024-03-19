import React, { useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addsearch } from "../../store/reducers/recentsearch";

//assets
import Folder from "../../assets/stock/folder.png";
import Search from "../../assets/icons/Search.png";

import "../../styles/searchtab.css";
import SearchDrop from "../../components/stock/SearchDrop";


export default function SearchTab() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchList) || [];
  const [inputValue, setInputValue] = useState(""); //입력값

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "90%",
        marginBlock: "8px",
      }}
    >
      <div
        class="dropdown"
        style={{
          display: "flex",
          flexDirection: "column", 
          width: "480px",
          height: "50px",
          border: "3px solid black",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50px",
            alignItems: "center",
          }}
        >
          <img
            src={Search}
            className="iconMedium"
            style={{ marginRight: "4px" }}
          />
          <input
            class="input-style"
            type="text"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <div
            class="searchbutton-style"
            onClick={() => {
              const action = addsearch({
                id: search.length,
                content: inputValue,
              });
              dispatch(action);
              console.log(action);
            }}
          >
            검색
          </div>
        </div>
        <div class="block">
          {SearchDrop ({keyword: inputValue})}
        </div>
      </div>

   
    </div>
  );
}
