import React, { useEffect, useState } from "react";
import { getKoreaPortfolio } from "../../lib/apis/portfolio";
import { getLikePortfolio } from "../../lib/apis/portfolio";
import { getRecommend, getStockPrice } from "../../lib/apis/stock";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";
import shinhan_heart_chatbox from "../../assets/stock/shinhan_heart_chatbox.png";

//components
import StockList from "./StockList";
import { useSelector } from "react-redux";

export default function StockPrice() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedMySmallTab, setSelectedMySmallTab] = useState(1);
  const [list, setList] = useState([]);
  const search = useSelector((state) => state.search.searchList) || [];
  const user = useSelector((state) => state.user.user) || {};

  useEffect(() => {
    const fetchData = async () => {
      // const res = await getRecommend();
      // console.log("추천!!!!!!!!!!", res);

      if (selectedMySmallTab === 0) {
        const updatedList = await Promise.all(
          search.map(async (item) => {
            try {
              const priceData = await getStockPrice(item.stock_code);
              item.current_price = priceData.output2
                ? priceData.output2.stck_prpr
                : "불러오는 중..";
            } catch (error) {
              console.error(error);
              item.current_price = "가격 정보 불러오는 중..";
            }
            return item;
          })
        );

        setList(updatedList);
      } else if (selectedMySmallTab === 1) {
        const res = await getKoreaPortfolio(user.user_id);
        setList(res.mystock_percent);
      } else if (selectedMySmallTab === 2) {
        const resp = await getLikePortfolio(user.user_id);
        setList(resp);
      }

      if (selectedTab === 1) {
        const res = await getRecommend();
        setList(res);
      }
    };

    fetchData();
  }, [selectedMySmallTab, selectedTab]);

  console.log(list);
  console.log(search);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "45%" }}>
        <div style={{ display: "flex" }}>
          <img
            src={Flag}
            className="iconSmall"
            style={{ marginRight: "8px" }}
          />
          <div
            className="myStockTab"
            style={{
              backgroundColor: selectedTab === 0 ? "#ffe27a" : "white",
            }}
            onClick={() => setSelectedTab(0)}
          >
            나의 종목 시세
          </div>
          <div
            className="myStockTab"
            style={{
              backgroundColor: selectedTab === 1 ? "#ffe27a" : "white",
            }}
            onClick={() => setSelectedTab(1)}
          >
            추천 종목
          </div>
        </div>

        <div
          style={{
            width: "100%",
            marginLeft: "3px",
            // border: "3px solid #6082E1",
            borderRadius: "16px",
            boxShadow: "2px 0px 5px 0px rgba(0,0,0,0.2)",
            padding: "8px",
          }}
        >
          {selectedTab === 0 && (
            <div style={{ display: "flex", gap: "2%" }}>
              <div
                className={
                  selectedMySmallTab === 0 ? "smallTabSelected" : "smallTab"
                }
                onClick={() => setSelectedMySmallTab(0)}
              >
                최근종목
              </div>
              <div
                className={
                  selectedMySmallTab === 1 ? "smallTabSelected" : "smallTab"
                }
                onClick={() => setSelectedMySmallTab(1)}
              >
                보유종목
              </div>
              <div
                className={
                  selectedMySmallTab === 2 ? "smallTabSelected" : "smallTab"
                }
                onClick={() => setSelectedMySmallTab(2)}
              >
                관심종목
              </div>
            </div>
          )}

          <div>
            {list.length !== 0 ? (
              list.map((item, id) => (
                <StockList type="rank" item={item} key={item.stock_code} />
              ))
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                실시간 종목 랭킹이 존재하지 않아요!
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src={shinhan_heart_chatbox}
          style={{ width: "300px", height: "300px" }}
        />
      </div>
    </div>
  );
}
