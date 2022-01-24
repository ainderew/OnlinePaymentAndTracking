import React, { useState, useEffect } from "react";
import "./receipt.style.scss";

import { toCurrencyString } from "../../scripts/DOM";

// IMAGES
import logo from "../../assets/logo.svg";
import bc from "../../assets/barcode.png";


const COMPONENT_RECEIPT = ({ orderData, customerPayment, printFlag, hideReceipt, hidePaymentDetails, clearOrderData }) => {

    const [priceTotal, setPriceTotal] = useState(0)
    
    useEffect(()=>{
        getPriceTotal(orderData);
    },[orderData])

    useEffect(() => {
        if (printFlag) {
            setTimeout(() => {
                printOut();
                hideReceipt();
                hidePaymentDetails();
                clearOrderData();
            }, 500)

        }
    }, [printFlag])

    const printOut = () => {
        window.print()
    }

    const getPriceTotal = (orderData) =>{
        let sum = 0;
        orderData.map(el => sum+=parseFloat(el.orderQty*el.price));
        setPriceTotal(sum);
    }


    return (
        (printFlag) ?
            <div className="div_receipt">
                <img src={logo} alt="logo" className="img_logo" />
                <span className="span_info">6538 Libertad st.<br /> Palompon Leyte</span>

                <div className="div_receipt_info">
                    <span className="span_date">Date: 01/21/2022 7:25</span>
                    <img src={bc} alt="" className="img_barcode" />

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
                        <div className="span_data">{toCurrencyString(priceTotal)}</div>
                    </div>
                    <div className="row">
                        <div className="span_header">Customer Cash</div>
                        <div className="span_data">{toCurrencyString(customerPayment)}</div>
                    </div>
                    <div className="row">
                        <div className="span_header">Change</div>
                        <div className="span_data">{toCurrencyString(customerPayment - priceTotal)}</div>
                    </div>
                </div>
                <span className="span_note">Techpal thanks you for you purchase!</span>
            </div>
            : ""
    )
}

export default COMPONENT_RECEIPT;