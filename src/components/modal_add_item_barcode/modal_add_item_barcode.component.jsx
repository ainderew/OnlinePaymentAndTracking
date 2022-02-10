import React, {useState} from "react";
import Styles from "./modal_add_item_barcode.module.scss";

// IMAGES
import IMG_barcode from "../../assets/read_barcode.svg"

const COMPONENT_MODAL_ADD_ITEM_BARCODE = ({flag, toggleBarcodeFlag, toggleModalInfoFlag,setBarcode}) =>{


    const scanned = (e) =>{
        setBarcode(e.target.value);
        toggleBarcodeFlag();
        toggleModalInfoFlag();
        
    } 

    return(
        (flag) 
        ?<div className={Styles.div_main}>
            <span className={Styles.span_header}>Scan item's barcode</span>
            <img src={IMG_barcode} alt="scan the barcode" className={Styles.img_scan_barcode} />
            <input onChange={(e)=>scanned(e)} type="text" autoFocus={true} className={Styles.input} />
        </div>
        : ""
    )
}

export default COMPONENT_MODAL_ADD_ITEM_BARCODE;