import React from "react";
import "./container_category.style.scss";

import { getColor } from "../../scripts/DOM";


const Component_Container_Category = ({ ParentData, index, getItemFetchFunction }) => {
    return (
        <div onClick={() => { getItemFetchFunction(ParentData.id) }}
            // style={{ color: getColor(index) }} 
            className="container_category">
            <span className="header_container">{ParentData.name}</span>
            <span className="span_details">10 Items</span>
        </div>
    )
}

export default Component_Container_Category;

// TO DOs
// span_details - display actual number of items in category
// get rid of index and get color import