import React from "react";
import "./container_item.style.scss";


const Component_Container_Item = ({data}) => {
    return (
        <div className="container_item">
            <div className="header_divider_brandbox center">
                <span className="header_brand bold">{data.brand}</span>
            </div>

            <div className="header_divider_center">
                <span className="header_items">{data.name}</span>
                <span className="header_items sub_text">Stock: 8</span>
            </div>

            <div className="header_divider_price center_vertical">
                <span className="header_price bold sub_text">PHP {data.price}</span>
            </div>
        </div>
    )
}

export default Component_Container_Item;