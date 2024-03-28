import React, { useState, useEffect } from "react";
import { stockSocket } from "../../lib/socket/socket";
import { useSelector } from "react-redux";
import {
  postBuyStock,
  postSellStock,
  getSellQuantityStock,
} from "../../lib/apis/stock";
import { useParams } from "react-router-dom";

export default function TradeModal(props) {
  const user = useSelector((state) => state.user.user) || {};
  const params = useParams();

  const stockId = params.stockId;
  const stockName = params.stockName;
  console.log(stockId, stockName);

  // Note
  // 1. 매수 가능 금액 필요 -> 성공시 DB, Redux store 수정
  //     1.1 매수, 매도 초기 주문 가격은 현재가로 설정
  // 2. 매도 가능 종목수 필요 -> 성공시 DB 수정, 처음에 get해서 가져오도록
  console.log(user);

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stockData, setStockData] = useState([
    "6000",
    "60",
    "7000",
    "70",
    "8000",
    "80",
    "9000",
    "90",
    "10000",
    "100",
    "5000",
    "50",
    "4000",
    "40",
    "3000",
    "30",
    "2000",
    "20",
    "1000",
    "10",
    "0",
    "0",
  ]);

  const [priceData, setPriceData] = useState(["0", "0", "0", "0"]);
  const [sellQuantity, setSellQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);

  const clickBuy = async (user_id, stock_code, quantity, transaction_price) => {
    try {
      const resp = await postBuyStock(
        user_id,
        stock_code,
        quantity,
        transaction_price
      );

      console.log("매수쪽", resp);

      if (resp === "성공") {
        console.log("매수 주문 성공");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clickSell = async (
    user_id,
    stock_code,
    quantity,
    transaction_price
  ) => {
    try {
      const resp = await postSellStock(
        user_id,
        stock_code,
        quantity,
        transaction_price
      );

      console.log("매도쪽", resp);

      if (resp === "성공") {
        console.log("매도 주문 성공");
        getSellQuantity(user.user_id, stockId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSellQuantity = async (user_id, stock_code) => {
    try {
      const resp = await getSellQuantityStock(user_id, stock_code);
      console.log("매도쪽", resp);
      setSellQuantity(resp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(user.user_id, stockId, quantity, price);
    const handleStockData = (data) => {
      console.log(data);
      setStockData(data);
      // 데이터를 상태에 저장하거나 화면에 출력하는 로직 추가
    };

    const handlePriceData = (data) => {
      console.log(data);
      setPriceData(data);
      // 데이터를 상태에 저장하거나 화면에 출력하는 로직 추가
    };

    getSellQuantity(user.user_id, stockId);
    console.log("user 캐시", user.cash);
    console.log("주문 가격", price);

    setBuyPrice(parseInt(user.cash) % parseInt(price));

    // 'stockData' 이벤트를 받을 때 실행될 핸들러 등록
    stockSocket.on("stockData", handleStockData);
    // 'stockData' 이벤트를 받을 때 실행될 핸들러 등록
    stockSocket.on("priceData", handlePriceData);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 해제
    // return () => {
    //   stockSocket.off("stockData", handleStockData);
    //   stockSocket.off("priceData", handlePriceData);
    // };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          width: "60%",
          height: "90%",
          borderRadius: "16px",
          backgroundColor: "white",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            fontSize: "32px",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{ marginRight: "8px", cursor: "pointer" }}
            onClick={() => props.setIsTrade(false)}
          >
            X
          </span>
        </div>
        <div
          style={{
            width: "93%",
            height: "90%",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "2px 0px 10px 0 rgba(0,0,0,0.2)",
            }}
          >
            <LivePrice color="white" price="호가" left="잔량" />
            <LivePrice
              color="#ECF2FF"
              price={stockData[8]}
              percentage="0.33"
              left={stockData[9]}
              totalLeft={stockData[20]}
              click={setPrice}
            />
            <LivePrice
              color="#ECF2FF"
              price={stockData[6]}
              percentage="0.22"
              left={stockData[7]}
              totalLeft={stockData[20]}
              click={setPrice}
            />
            <LivePrice
              color="#ECF2FF"
              price={stockData[4]}
              percentage="0.11"
              left={stockData[5]}
              totalLeft={stockData[20]}
              click={setPrice}
            />
            <LivePrice
              color="#ECF2FF"
              price={stockData[2]}
              percentage="0.00"
              left={stockData[3]}
              totalLeft={stockData[20]}
              click={setPrice}
            />
            <LivePrice
              color="#ECF2FF"
              price={stockData[0]}
              percentage="-0.11"
              left={stockData[1]}
              totalLeft={stockData[20]}
              click={setPrice}
            />
            <LivePrice
              color="#FFEAE9"
              price={stockData[10]}
              percentage="-0.22"
              left={stockData[11]}
              totalLeft={stockData[21]}
              click={setPrice}
            />
            <LivePrice
              color="#FFEAE9"
              price={stockData[12]}
              percentage="-0.33"
              left={stockData[13]}
              totalLeft={stockData[21]}
              click={setPrice}
            />
            <LivePrice
              color="#FFEAE9"
              price={stockData[14]}
              percentage="-0.44"
              left={stockData[15]}
              totalLeft={stockData[21]}
              click={setPrice}
            />
            <LivePrice
              color="#FFEAE9"
              price={stockData[16]}
              percentage="-0.54"
              left={stockData[17]}
              totalLeft={stockData[21]}
              click={setPrice}
            />
            <LivePrice
              color="#FFEAE9"
              price={stockData[18]}
              percentage="-0.65"
              left={stockData[19]}
              totalLeft={stockData[21]}
              click={setPrice}
            />
          </div>
          <div
            style={{
              width: "60%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "90%",
                border: "3px solid black",
                borderRadius: "16px",
                display: "flex",
                padding: "8px",
                boxSizing: "border-box",
                justifyContent: "center",
                alignItems: "flex-end",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "24px" }}>{stockName}</span>
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "8px",
                  color: "#62616D",
                }}
              >
                {stockId}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "32px" }}>{priceData[0]}</span>
              <span style={{ fontSize: "12px" }}>
                {priceData[1]} {priceData[2]} {priceData[3]}%
              </span>
            </div>
            <div
              style={{
                width: "80%",
                height: "60%",
                marginTop: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBlock: "24px",
                }}
              >
                <span style={{ fontSize: "20px" }}>수량</span>
                <div
                  style={{
                    width: "70%",
                    height: "80%",
                    border: "3px solid lightgray",
                    borderRadius: "16px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      quantity > 0 ? setQuantity((prev) => prev - 1) : null
                    }
                  >
                    -
                  </div>
                  <div
                    style={{
                      flex: 3,
                      borderInline: "3px solid lightgray",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      padding: "8px",
                      boxSizing: "border-box",
                    }}
                  >
                    <input
                      type="text"
                      value={quantity === 0 ? "" : quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      style={{
                        width: "90%",
                        outline: "none",
                        backgroundColor: "transparent",
                        border: "none",
                        direction: "rtl",
                        fontFamily: "DNFBitBitv2",
                      }}
                    />
                    <span style={{ color: "lightgray", fontSize: "12px" }}>
                      주
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBlock: "24px",
                }}
              >
                <span style={{ fontSize: "20px" }}>가격</span>
                <div
                  style={{
                    width: "70%",
                    height: "80%",
                    border: "3px solid lightgray",
                    borderRadius: "16px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      price > 0 ? setPrice((prev) => prev - 1) : null
                    }
                  >
                    -
                  </div>
                  <div
                    style={{
                      flex: 3,
                      borderInline: "3px solid lightgray",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      padding: "8px",
                      boxSizing: "border-box",
                    }}
                  >
                    <input
                      type="text"
                      value={price === 0 ? "" : price}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                      style={{
                        width: "90%",
                        outline: "none",
                        backgroundColor: "transparent",
                        border: "none",
                        direction: "rtl",
                        fontFamily: "DNFBitBitv2",
                      }}
                    />
                    <span style={{ color: "lightgray", fontSize: "12px" }}>
                      원
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setPrice((prev) => prev + 1)}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  marginBottom: "10px", // 버튼과의 간격
                  color: "black",
                  fontSize: "16px",
                }}
              >
                매수 가능 수량: {buyPrice}
              </div>

              <div
                style={{
                  marginBottom: "10px", // 버튼과의 간격
                  color: "black",
                  fontSize: "16px",
                }}
              >
                매도 가능 수량: {sellQuantity}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "60px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F3322C",
                  color: "white",
                  fontSize: "20px",
                  padding: "8px",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
                onClick={() => clickBuy(user.user_id, stockId, quantity, price)}
              >
                매수(살래요)
              </div>
              <div
                style={{
                  width: "150px",
                  height: "60px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#254EFB",
                  color: "white",
                  fontSize: "20px",
                  padding: "8px",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
                onClick={() =>
                  clickSell(user.user_id, stockId, quantity, price)
                }
              >
                매도(팔래요)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} //

const LivePrice = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "10%",
        backgroundColor: props.color,
        display: "flex",
        borderBottom: "1px solid white",
      }}
      onClick={() => props.click(props.price)}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          borderRight: "1px solid lightgray",
          paddingInline: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: props.color !== "white" ? "flex-end" : "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <span>{props.price}</span>
        {props.percentage ? (
          <span style={{ color: "#C5B5B4", fontSize: "12px" }}>
            {props.percentage}%
          </span>
        ) : null}
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          paddingInline: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: props.color !== "white" ? "space-between" : "center",
        }}
      >
        <div
          style={{
            backgroundColor: props.color === "#ECF2FF" ? "#D2E8FF" : "#FFD8D9",
            justifySelf: "start",
            // width: `${parseInt(props.left.replace(/,/g, "")) / 100}%`,
            width: `${(parseInt(props.left) / props.totalLeft) * 100}%`,
            height: "100%",
            margin: "-8px",
          }}
        />
        {props.left}
      </div>
    </div>
  );
};
