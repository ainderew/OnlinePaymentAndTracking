import React, {useState} from "react";
import Styles from "./blur.module.scss"

const COMPONENT_BLUR = ({flag}) =>{
    return (flag) 
    ? <div className={`${Styles.div} blur`}></div>
    : ""
}

export default COMPONENT_BLUR;