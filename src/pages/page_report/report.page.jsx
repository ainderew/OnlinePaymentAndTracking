import React from "react";
import Styles from "./report.module.scss";

const PAGE_REPORT = () =>{
    return(
        <div className={Styles.div_main}>
            <div className={Styles.div_left}>
                {/* table that contains all the data of the orders */}
            </div>
            <div className={Styles.div_right}>
                {/* this here will be statistic that relate to the data on the left */}
            </div>
        </div>
    )
}

export default PAGE_REPORT