import React from "react";

export default function TradeModal(props) {
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
              price="92,100"
              percentage="0.33"
              left="106"
            />
            <LivePrice
              color="#ECF2FF"
              price="92,100"
              percentage="0.22"
              left="643"
            />
            <LivePrice
              color="#ECF2FF"
              price="92,000"
              percentage="0.11"
              left="1,687"
            />
            <LivePrice
              color="#ECF2FF"
              price="91,900"
              percentage="0.00"
              left="729"
            />
            <LivePrice
              color="#ECF2FF"
              price="91,800"
              percentage="-0.11"
              left="3,659"
            />
            <LivePrice
              color="#FFEAE9"
              price="91,700"
              percentage="-0.22"
              left="224"
            />
            <LivePrice
              color="#FFEAE9"
              price="91,600"
              percentage="-0.33"
              left="1,078"
            />
            <LivePrice
              color="#FFEAE9"
              price="91,500"
              percentage="-0.44"
              left="636"
            />
            <LivePrice
              color="#FFEAE9"
              price="91,400"
              percentage="-0.54"
              left="1,133"
            />
            <LivePrice
              color="#FFEAE9"
              price="91,300"
              percentage="-0.65"
              left="2,085"
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
              <span style={{ fontSize: "24px" }}>신한 지주</span>
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "8px",
                  color: "#62616D",
                }}
              >
                A05550
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
              <span style={{ fontSize: "32px" }}>46,000</span>
              <span style={{ fontSize: "12px" }}>+ 600(1.3%)</span>
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
            width: `${parseInt(props.left.replace(/,/g, "")) / 100}%`,
            height: "100%",
            margin: "-8px",
          }}
        />
        {props.left}
      </div>
    </div>
  );
};
