import React from "react";
import Styles from "./side_menu.module.scss";
import {Link} from "react-router-dom";

//ASSETS
import IMG_inventory from "../../assets/inventory.svg";
import IMG_report from "../../assets/report.svg";
import IMG_cart from "../../assets/cart.svg";
import IMG_PC from "../../assets/PC.svg";

const Component_SideMenu = () =>{
    return(
        
        <div className={`${Styles.side_nav} print_hidden` }>
            <div className={`${Styles.row} ${Styles.row1}`}>
                <img className={Styles.icon} src={IMG_PC} alt="" />
            </div>
            <div className={`${Styles.row} ${Styles.row2}`}>
                <Link className={Styles.link} to="/" > <img className={Styles.icon} src={IMG_cart} alt="" /> </Link>
                <Link className={Styles.link} to="/inventory" > <img className={Styles.icon} src={IMG_inventory} alt="" /> </Link>
                <Link className={Styles.link} to="/report" > <img className={Styles.icon} src={IMG_report} alt="" /> </Link>

            </div>
            <div className={`${Styles.row} ${Styles.row3}`}></div>
        </div>
    )
}

export default Component_SideMenu;