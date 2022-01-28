import React from "react";
import Styles from "./container_custom_order.module.scss";

const COMPONENT_CONTAINER_CUSTOM_ORDER = ({toggleCustomeOrderFlag, toggleBlur}) =>{
    return(
        <div onClick={toggleCustomeOrderFlag} className={Styles.div_custom_container}>
            <span className={Styles.span_header}>Custom Order/Repair</span>
            <span className={Styles.span_details}>0 items</span>
        </div>
    )
}

export default COMPONENT_CONTAINER_CUSTOM_ORDER;