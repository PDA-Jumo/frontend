import React, {useContext} from "react";
import MyStock from "./myStock";
import MyKoreaStock from "./MyKoreaStock";
import MyWorldStock from "./MyWorldStock";
import MyLikeStock from "./MylikeStock";
import { MyStockPageContext } from "../../pages/Stock/Stock";

export default function MyStockSelector(){
    const {mystockPage} = useContext(MyStockPageContext)

    return (     
            <div>
                {mystockPage ==="1"?(
                    <MyStock/>
                ): mystockPage ==="2"?(
                    <MyKoreaStock/>
                ):mystockPage ==="3"?(
                    <MyWorldStock/>
                ):(
                    <MyLikeStock/>
                )}
            </div>
    )
}

