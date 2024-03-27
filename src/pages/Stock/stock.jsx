import React, { useState } from "react";
import "../../styles/stock.css";
import { useDispatch, useSelector } from "react-redux";
import { addsearch } from "../../store/reducers/recentsearch";

//assets
import Background from "../../assets/backgrounds/Stock.png";
import Folder from "../../assets/stock/folder.png";

//components
import SearchDrop from "../../components/stock/SearchDrop";

export default function StockLayout() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchList) || [];
  const [inputValue, setInputValue] = useState(""); //입력값

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src={Background} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          width: "86%",
          top: 100,
          left: 100,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <input
              class="input-style"
              type="text"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              class="searchbutton-style"
              onClick={() => {
                const action = addsearch({
                  id: search.length,
                  content: inputValue,
                });
                dispatch(action);
                console.log(action);
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "5%", left: 30 }}>
            <tab class="korea">
              <img src={Folder} />
              국내주식
            </tab>
            <tab class="korea">
              <img src={Folder} />
              해외주식
            </tab>
            <tab class="korea">
              <img src={Folder} />
              내주식
            </tab>
          </div>
        </div>
            <SearchDrop/>
      </div>
    </div>
  );
}
