import React, { useState, useEffect } from "react";
import { stockSocket } from "../../lib/socket/socket";
import { useSelector } from "react-redux";
import {
  postBuyStock,
  postSellStock,
  getSellQuantityStock,
  getBuyQuantityStock,
  getInitialStock,
  postBuyStockSuccessfully,
  postSellStockSuccessfully,
} from "../../lib/apis/stock";
import { useParams } from "react-router-dom";
import socketEvent from "../../lib/socket/StockSocketEvents";
import { useNavigate } from "react-router-dom";

export default function TradeModal(props) {
  // user 데이터 가져오기
  const user = useSelector((state) => state.user.user) || {};
  const navigate = useNavigate;
  const stockId = props.item.stock_code;
  const stockName = props.item.stock_name || props.item.stbd_nm;
  console.log("TradeModal 페이지", stockId, stockName);
  console.log(user);
  const [isPriceVisible, setIsPriceVisible] = useState(true);
  const togglePriceVisibility = () => {
    setIsPriceVisible(!isPriceVisible);
    console.log("toggled");
  };
  // Note
  // 1. 매수 가능 금액 필요 -> 성공시 DB, Redux store 수정
  //     1.1 매수, 매도 초기 주문 가격은 현재가로 설정
  // 2. 매도 가능 종목수 필요 -> 성공시 DB 수정, 처음에 get해서 가져오도록
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stockData, setStockData] = useState({
    output1: {
      askp: ["0", "0", "0", "0", "0"],
      askp_rsqn: ["0", "0", "0", "0", "0"],
      bidp: ["0", "0", "0", "0", "0"],
      bidp_rsqn: ["0", "0", "0", "0", "0"],
      total_askp_rsqn: 0,
      total_bidp_rsqn: 0,
    },
    output2: {
      antc_cntg_prdy_ctrt: "0",
      antc_cntg_vrss: "0",
      antc_cntg_vrss_sign: "1",
      stck_oprc: "0",
      stck_prpr: "0",
    },
  });

  // 매도 가능 수량, 매수 가능 수량
  const [sellQuantity, setSellQuantity] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);

  // 매수, 매도 주문
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 부호
  const [characterSign, setCharacterSign] = useState("-");

  const clickBuy = async (user_id, stock_code, quantity, transaction_price) => {
    try {
      // 가장 최선의 조건인 stockData.output1.askp[0] < 100 일 때 '아직 개장 전이에요' 메시지를 모달로 표시
      if (stockData.output1.askp[0] < 100) {
        setModalMessage(`아직 개장 전이에요`);
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
        // 이 경우 추가적인 처리 없이 함수를 종료합니다.
        return;
      }

      // 매수 가능 수량 - 주문 수량 >= 0 보다 크면
      // 아니면, 매수 주문

      // 매도 호가 1가격 이상으로 주문한 것인지 비교
      // 매수
      // 0 < 주문 수량 <= 주문 가능 수량
      //   매도호가 0보다 같거나 높은 가격으로 주문 넣을시 매도호가 0으로 체결, 아닐시 해당 가격으로 주문만 남겨두기
      // 0이거나 주문 가능 수량 초과면 주문 실패
      if (quantity > 0 && quantity <= buyQuantity) {
        if (
          transaction_price >= stockData.output1.askp[0] ||
          isPriceVisible === false
        ) {
          console.log("매수 바로 체결");
          // 주문 가격으로 매수 가능 수량 변경
          getBuyQuantity(user.user_id, stockId, stockData.output1.askp[0]);
          // API 호출 및 성공 응답 가정
          setModalMessage(
            `${stockName}종목 ${quantity}주 ${stockData.output1.askp[0]}원 \n 매수 주문이 체결되었습니다.`
          );
          setIsModalOpen(true);
          setTimeout(() => {
            setIsModalOpen(false);
            window.location.reload();
          }, 3000);
          // 체결 로직 (실제 구현 필요)
          const resp = await postBuyStockSuccessfully(
            user_id,
            stock_code,
            quantity,
            stockData.output1.askp[0]
          );
        } else {
          const resp = await postBuyStock(
            user_id,
            stock_code,
            quantity,
            transaction_price
          );

          console.log("매수쪽", resp);
          console.log("매수 주문 성공");
          // 주문 가격으로 매수 가능 수량 변경
          getBuyQuantity(user.user_id, stockId, stockData.output2.stck_prpr);
          // API 호출 및 성공 응답 가정
          setModalMessage(
            `${stockName}종목 ${quantity}주 ${stockData.output1.askp[0]}원 \n 매수 주문이 접수되었습니다.`
          );
          setIsModalOpen(true);
          setTimeout(() => {
            setIsModalOpen(false);
            window.location.reload();
          }, 3000);
        }
      } else {
        // API 호출 및 성공 응답 가정
        setModalMessage(`주문 가능 수량을 다시 확인하세요.`);
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      // 오류 처리 로직
      alert("준비중입니다."); // 사용자에게 알림
      navigate("/stock"); // 이전 페이지로 돌아가기
    }
  };

  const clickSell = async (
    user_id,
    stock_code,
    quantity,
    transaction_price
  ) => {
    try {
      if (stockData.output1.bidp[0] < 100) {
        setModalMessage("아직 개장 전이에요");
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
        // 이 경우 추가적인 처리 없이 함수를 종료합니다.
        return;
      }
      // 매도
      // 0 < 주문 수량 < 주문 가능 수량
      //   매수호가 0보다 같거나 낮은 가격으로 매도주문 넣을 시 매도호가 0으로 체결.
      // 시장가로 판매시 매도호가 0으로 체결.
      //   주문가격이 현재가보다 같거나 크면 주문 가격으로 주문
      // 0이거나 주문 가능 수량 초과면 주문 실패

      if (quantity > 0 && quantity <= sellQuantity) {
        if (
          transaction_price <= stockData.output1.bidp[0] ||
          isPriceVisible === false
        ) {
          // 주문 가격으로 매수 가능 수량 변경
          getBuyQuantity(user.user_id, stockId, stockData.output1.bidp[0]);
          // API 호출 및 성공 응답 가정
          setModalMessage(
            `${stockName}종목 ${quantity}주 ${stockData.output1.bidp[0]}원 \n 매도 주문이 체결되었습니다.`
          );
          setIsModalOpen(true);
          setTimeout(() => {
            setIsModalOpen(false);
            window.location.reload();
          }, 3000);
          // 체결 로직 (실제 구현 필요)
          const resp = await postSellStockSuccessfully(
            user_id,
            stock_code,
            quantity,
            stockData.output1.bidp[0]
          );
        } else {
          getSellQuantity(user.user_id, stockId);
          // API 호출 및 성공 응답 가정
          setModalMessage(
            `${stockName}종목 ${quantity}주 \n ${transaction_price}원 \n 매도 주문이 접수되었습니다.`
          );
          setIsModalOpen(true);
          setTimeout(() => {
            setIsModalOpen(false);
            window.location.reload();
          }, 3000);
          // 주문 등록 로직 (실제 구현 필요)
          const resp = await postSellStock(
            user_id,
            stock_code,
            quantity,
            transaction_price
          );
        }
      } else {
        // API 호출 및 성공 응답 가정
        setModalMessage(`주문 가능 수량을 다시 확인하세요.`);
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      // 오류 처리 로직
      alert("준비중입니다."); // 사용자에게 알림
      navigate("/stock"); // 이전 페이지로 돌아가기
    }
  };

  // 매도 가능 수량 함수
  const getSellQuantity = async (user_id, stock_code) => {
    try {
      const resp = await getSellQuantityStock(user_id, stock_code);
      console.log("매도쪽", resp);
      setSellQuantity(resp);
    } catch (error) {
      // 오류 처리 로직
      alert("준비중입니다."); // 사용자에게 알림
      navigate("/stock"); // 이전 페이지로 돌아가기
    }
  };

  // 매수 가능 수량 함수
  const getBuyQuantity = async (user_id, stock_code, stock_current_price) => {
    try {
      const resp = await getBuyQuantityStock(user_id, stock_code);
      console.log("매수쪽 조회 수량", resp);
      setBuyQuantity(Math.floor(resp / stock_current_price));
      console.log("매수 가능 수량", buyQuantity);
    } catch (error) {
      // 오류 처리 로직
      alert("준비중입니다."); // 사용자에게 알림
      navigate("/stock"); // 이전 페이지로 돌아가기
    }
  };

  const setInitialStock = async (stock_code) => {
    try {
      // Redis에서 초기 값 get
      const resp = await getInitialStock(stock_code);

      // 초기값 세팅
      setStockData({ output1: resp.output1, output2: resp.output2 });
      setPrice(resp.output2.stck_prpr);
      getCharacterBySign(resp.output2.antc_cntg_vrss_sign);
      // 매수 가능 수량 조회
      await getBuyQuantity(user.user_id, stockId, resp.output2.stck_prpr);
    } catch (error) {
      // 오류 처리 로직
      alert("준비중입니다."); // 사용자에게 알림
      navigate("/stock"); // 이전 페이지로 돌아가기
    }
  };

  useEffect(() => {
    // 종목 상세 페이지 입장
    socketEvent.joinRoom(stockId, user.user_id);
    // 현재가 데이터 로드
    socketEvent.getStockdata((currentprice) => {
      console.log(currentprice);
      setStockData(currentprice);
      getCharacterBySign(currentprice.output2.antc_cntg_vrss_sign);
    });
    return () => {
      socketEvent.leaveRoom(stockId, user.user_id);
    };
  }, [stockId, user.user_id]);

  // 초기 페이지 세팅
  useEffect(() => {
    console.log(user.user_id, stockId, quantity, price);
    // API로 Redis에서 초기 페이지 초기화
    setInitialStock(stockId);

    // 매도 가능 수량 설정
    getSellQuantity(user.user_id, stockId);
    console.log("user 캐시", user.cash);
    console.log("주문 가격", price);
  }, []);

  // 매수 가격 누를 때마다 가능 수량 조회
  useEffect(() => {
    // 매수 가능 수량 조회
    getBuyQuantity(user.user_id, stockId, price);
  }, [price]);

  // 부호에 따라 색깔 바꾸기
  // 1 : 상한
  // 2 : 상승
  // 3 : 보합
  // 4 : 하한
  // 5 : 하락
  function getColorBySign(sign) {
    switch (sign) {
      case "1":
      case "2":
        return "red";
      case "3":
        return "black";
      case "4":
      case "5":
        return "blue";
      default:
        return "black"; // 기본값으로 검은색 설정
    }
  }

  function getCharacterBySign(sign) {
    switch (sign) {
      case "1":
      case "2":
        return setCharacterSign("▲");
      case "3":
        return setCharacterSign("-");
      case "4":
      case "5":
        return setCharacterSign("▼");
      default:
        return setCharacterSign("-");
    }
  }

  function Modal({ message }) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "73%",
          width: "35%",
          height: "10%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "32px",
          fontSize: "24px",
          textAlign: "center",
          display: "flex", // flexbox 레이아웃 사용
          alignItems: "center", // 세로 방향에서 가운데 정렬
          justifyContent: "center", // 가로 방향에서 가운데 정렬
        }}
      >
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isModalOpen && <Modal message={modalMessage} />}
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
            price={stockData.output1.askp[4]}
            percentage="0.33"
            left={stockData.output1.askp_rsqn[4]}
            totalLeft={stockData.output1.total_askp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#ECF2FF"
            price={stockData.output1.askp[3]}
            percentage="0.22"
            left={stockData.output1.askp_rsqn[3]}
            totalLeft={stockData.output1.total_askp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#ECF2FF"
            price={stockData.output1.askp[2]}
            percentage="0.11"
            left={stockData.output1.askp_rsqn[2]}
            totalLeft={stockData.output1.total_askp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#ECF2FF"
            price={stockData.output1.askp[1]}
            percentage="0.00"
            left={stockData.output1.askp_rsqn[1]}
            totalLeft={stockData.output1.total_askp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#ECF2FF"
            price={stockData.output1.askp[0]}
            percentage="-0.11"
            left={stockData.output1.askp_rsqn[0]}
            totalLeft={stockData.output1.total_askp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#FFEAE9"
            price={stockData.output1.bidp[0]}
            percentage="-0.22"
            left={stockData.output1.bidp_rsqn[0]}
            totalLeft={stockData.output1.total_bidp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#FFEAE9"
            price={stockData.output1.bidp[1]}
            percentage="-0.33"
            left={stockData.output1.bidp_rsqn[1]}
            totalLeft={stockData.output1.total_bidp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#FFEAE9"
            price={stockData.output1.bidp[2]}
            percentage="-0.44"
            left={stockData.output1.bidp_rsqn[2]}
            totalLeft={stockData.output1.total_bidp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#FFEAE9"
            price={stockData.output1.bidp[3]}
            percentage="-0.54"
            left={stockData.output1.bidp_rsqn[3]}
            totalLeft={stockData.output1.total_bidp_rsqn}
            click={setPrice}
          />
          <LivePrice
            color="#FFEAE9"
            price={stockData.output1.bidp[4]}
            percentage="-0.65"
            left={stockData.output1.bidp_rsqn[4]}
            totalLeft={stockData.output1.total_bidp_rsqn}
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
              color: getColorBySign(stockData.output2.antc_cntg_vrss_sign),
            }}
          >
            <span style={{ fontSize: "32px" }}>
              {stockData.output2.stck_prpr}
            </span>
            <span style={{ fontSize: "12px" }}>
              {characterSign} {stockData.output2.antc_cntg_vrss}{" "}
              {stockData.output2.antc_cntg_prdy_ctrt}%
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBlock: "24px",
            }}
          >
            <input
              type="checkbox"
              id="marketPriceCheck"
              onClick={() => togglePriceVisibility()}
            />
            <label for="marketPriceCheck" style={{ marginLeft: "8px" }}>
              시장가
            </label>
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
            {isPriceVisible && (
              <div
                id="priceDiv"
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
            )}
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
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
              <div
                style={{
                  marginBottom: "10px", // 버튼과의 간격
                  color: "black",
                  fontSize: "16px",
                }}
              >
                매수 가능 수량: {buyQuantity}
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
}

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
      onClick={() =>
        props.color !== "white" ? props.click(parseInt(props.price)) : null
      }
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
