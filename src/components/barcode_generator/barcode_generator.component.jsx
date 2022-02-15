import React from "react";
import ReactJSBarcode from "react-jsbarcode";

const COMPONENT_BARCODE = ({barcodeID}) =>{
    return(
        <ReactJSBarcode className="width_100" value={barcodeID} options={{ format: 'code128' , height: 40, displayValue: false }} renderer="svg" />
    )
}

export default COMPONENT_BARCODE;