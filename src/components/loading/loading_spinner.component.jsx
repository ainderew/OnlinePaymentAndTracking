import React from "react";
import Styles from "./loading_spinner.module.scss";

import SVG_spinner from "../../assets/spinner.svg";

const COMPONENT_LOADING_SPINNER = ({flag}) =>{
    return(
        (flag)
        ? <div className={Styles.div}>
            <img className={Styles.loading_spinner} src={SVG_spinner} alt="" />
        </div>
        : ""
    )
}

export default COMPONENT_LOADING_SPINNER;