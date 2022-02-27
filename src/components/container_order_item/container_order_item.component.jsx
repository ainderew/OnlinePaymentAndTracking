import React from "react"
import "./container_order_item.style.scss";

const COMPONENT_CONTAINER_ORDER_ITEM = ({itemData, index, FUNCTION_editOrderItem}) => {
    return (
        <div onClick={()=>FUNCTION_editOrderItem(index)} className="container_order_item">
            <div className="wrapper_order_info">
                <span className="header_name bold">{itemData.name}</span>
                <span className="header_name sub_text">Price: PHP {itemData.price}</span>
                <span className="header_name sub_text margin_right_half">Qty: {itemData.orderQty}</span>
            </div>

            <div className="wrapper_order_price">
                <span className="header_price bold">PHP {itemData.orderQty * itemData.price}</span>
            </div>
        </div>
    )
}

export default COMPONENT_CONTAINER_ORDER_ITEM;