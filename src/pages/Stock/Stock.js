import React, { useState, useEffect, useContext } from "react";
//assets
import Folder from "../../assets/stock/folder.png";
//components
import SearchTab from "../../components/stock/SearchTab";
import StockDetail from "../../components/stock/StockDetail";
import MyStockSelector from "../../components/stock/MyStockSelector";
//css
import "../../styles/stock.css";

export const MyStockPageContext = React.createContext()

export default function StockPage() {
  const [mystockPage, setMyStockPage] = useState("1")
  const [page, Setpage] = useState(1);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    console.log(page);
    switch (page) {
      case 1:
        setComponent(<StockDetail />);
        break;
      case 2:
        setComponent(<StockDetail />);
        break;
      default:
        setComponent(<MyStockSelector />);
    }
  }, [page]);

  return (
    <MyStockPageContext.Provider value={{mystockPage, setMyStockPage}}>
      <div
      style={{
        backgroundColor: "white",
        border: "5px solid black",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1F409A",
          height: "60px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          border: "4px solid black",
        }}
      >
        <span style={{ marginRight: "16px", color: "white" }}>
          주린이의 모험
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          marginBlock: "8px",
        }}
      >
        <SearchTab />
        <div style={{ display: "flex", gap: "5%", left: 30 }}>
          <div class="korea" onClick={() => Setpage(1)}>
            <img src={Folder} />
            국내주식
          </div>
          <div class="korea" onClick={() => Setpage(2)}>
            <img src={Folder} />
            해외주식
          </div>
          <div class="korea" onClick={() => {Setpage(3); setMyStockPage("1")}}>
            <img src={Folder} />
            내주식
          </div>
        </div>
      </div>
      <div
        style={{
          border: "4px solid black",
          width: "95%",
          height: "70%",
          marginBlock: "8px",
          padding: "8px",
        }}
      >
        {component}
      </div>
      <div
        style={{
          height: "40px",
          backgroundColor: "#1F409A",
          width: "100%",
          border: "4px solid black",
        }}
      />
    </div>
      
    </MyStockPageContext.Provider>
    
  );
}
