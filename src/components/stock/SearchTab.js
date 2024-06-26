import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addsearch } from "../../store/reducers/recentsearch";

//assets
import Magnifier from "../../assets/icons/magnifier.png";

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
        // justifyContent: "space-between",
        // width: "90%",
        // marginBlock: "8px",
      }}
    >
      <div
        class="dropdown"
        style={{
          display: "flex",
          flexDirection: "column",
          // height: "50px",
          // border: "4px solid black",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "400px",
            // height: "50px",
            alignItems: "center",

            // backgroundColor: "white",
            // borderBottom: "1px solid lightgray",
          }}
        >
          {/* <img
            src={Search}
            className="iconMedium"
            style={{ marginRight: "4px" }}
          /> */}
          <input
            class="input-style"
            type="text"
            placeholder="주식 종목을 검색해보세요."
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <div
            class="searchbutton-style"
            onClick={() => {
              const action = addsearch({
                id: uuidv4(),
                content: inputValue,
              });
              dispatch(action);
              console.log(action);
            }}
          >
            <img src={Magnifier} className="iconSmall" />
          </div>
        </div>
        <div class="block">{SearchDrop({ keyword: inputValue })}</div>
      </div>
    </div>
  );
}
