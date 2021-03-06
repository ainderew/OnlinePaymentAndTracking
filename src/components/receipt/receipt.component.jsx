import React, { useState, useEffect } from "react";
import "./receipt.style.scss";

import { toCurrencyString, getDateAndTime } from "../../scripts/DOM";

// IMAGES
import logo from "../../assets/logo.svg";

// COMPONENT
import COMPONENT_BARCODE from "../barcode_generator/barcode_generator.component";


const COMPONENT_RECEIPT = ({ flag, orderData, customerPayment, closeAllModals, clearOrderData, orderPriceTotal, ReceiptBarcodeID }) => {

    // const [priceTotal, setPriceTotal] = useState(0)


    // useEffect(() => {
    //     getPriceTotal(orderData);
    // }, [orderData])

    useEffect(() => {
        if (flag) {
            setTimeout(() => {
                printOut();
                closeAllModals();
                clearOrderData();
            }, 500)

        }
    }, [flag])

    useEffect(()=>{
        console.log(ReceiptBarcodeID)
    },[ReceiptBarcodeID])


    const printOut = () => {
        window.print()
    }

    // const getPriceTotal = (orderData) => {
    //     let sum = 0;
    //     orderData.map(el => sum += parseFloat(el.orderQty * el.price));
    //     setPriceTotal(sum);
    // }

    


    return (
        (flag) ?
        // (true) ?
            <div className="div_receipt">
                <img src={logo} alt="logo" className="img_logo" />
                <span className="span_info">6538 Libertad st.<br /> Palompon Leyte</span>
                <div className="div_receipt_info">
                    <span className="span_date">{getDateAndTime()}</span>
                    {/* <img src={bc} alt="" className="img_barcode" /> */}
                    <COMPONENT_BARCODE barcodeID = {ReceiptBarcodeID} />

                </div>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th className="tbl_quantity">Qty</th>
                            <th className="tbl_name">Item Name</th>
                            <th className="tbl_price">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderData.map((el, index) => {
                            return (
                                <tr>
                                    <td className="tbl_quantity">{el.orderQty}</td>
                                    <td className="tbl_name">{el.name}</td>
                                    <td className="tbl_price">{toCurrencyString(el.price)}</td>
                                </tr>
                            )
                        })}
                
                    </tbody>
                </table>

                <div className="div_cash_info">
                    <div className="row">
                        <div className="span_header bold">TOTAL</div>
                        <div className="span_data">{toCurrencyString(orderPriceTotal)}</div>
                    </div>
                    <div className="row">
                        <div className="span_header">Customer Cash</div>
                        <div className="span_data">{toCurrencyString(customerPayment)}</div>
                    </div>
                    <div className="row">
                        <div className="span_header">Change</div>
                        <div className="span_data">{toCurrencyString(customerPayment - orderPriceTotal)}</div>
                    </div>
                </div>

                {/* <div className="div_cash_info">
                    <div className="row">
                        <div className="span_header bold">TOTAL</div>
                        <div className="span_data">P1040</div>
                    </div>
                    <div className="row">
                        <div className="span_header">Customer Cash</div>
                        <div className="span_data">P1100</div>
                    </div>
                    <div className="row">
                        <div className="span_header">Change</div>
                        <div className="span_data">P60</div>
                    </div>
                </div> */}
                <span className="span_note">Techpal thanks you for you purchase!</span>
            </div>
            : ""
    )
}

export default COMPONENT_RECEIPT;