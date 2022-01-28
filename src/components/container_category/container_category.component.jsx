import React from "react";
import "./container_category.style.scss";

import {getColor} from "../../scripts/DOM";

const getItems = () =>{
    
}

const Component_Container_Category = ({ParentData, index, getItemFetchFunction}) =>{
    return(
        <div onClick={()=>{getItemFetchFunction(ParentData.id)}} style={{backgroundColor: "#75B6FD"}} className="container_category">
            <span className="header_container">{ParentData.name}</span>
            <span className="span_details">10 Items</span>
        </div>
    )
}

export default Component_Container_Category;