import React from "react";
import "./container_category.style.scss";

import {getColor} from "../../scripts/DOM";

const getItems = () =>{
    
}

const Component_Container_Category = ({ParentData, index, getItemFetchFunction}) =>{
    return(
        <div onClick={()=>{getItemFetchFunction(ParentData.id)}} style={{backgroundColor: getColor(index)}} className="container_category">
            <span className="header_container">{ParentData.name}</span>
        </div>
    )
}

export default Component_Container_Category;