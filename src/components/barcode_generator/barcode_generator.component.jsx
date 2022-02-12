import React from "react";
import ReactJSBarcode from "react-jsbarcode";

const COMPONENT_BARCODE = () =>{
    return(
        <ReactJSBarcode value="test" options={{ format: 'code128', height: 40, displayValue: false }} renderer="svg" />
    )
}

export default COMPONENT_BARCODE;