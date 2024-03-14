import React from "react";
import { useSelector } from "react-redux";

//assets
import Trash from "../../assets/icons/Trash.png";

export default function SearchDrop() {
  const search = useSelector((state) => state.search.searchList) || [];

  return (
    <div>
      {search.map((item) => (
        <div
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {item.content}
          <img
           src={Trash} style={{width:"25px"}}
           onClick
          ></img>
        </div>
      ))}
    </div>
  );
}
