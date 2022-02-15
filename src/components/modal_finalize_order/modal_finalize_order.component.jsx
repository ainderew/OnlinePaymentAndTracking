import React, { useEffect } from "react";
import Styles from "./modal_finalize_order.module.scss";

import { toCurrencyString } from "../../scripts/DOM";

const COMPONENT_MODAL_FINALIZE_ORDER = ({ flag, togglePaymentModal, toggleReceiptModal, orderData, customerPayment, orderPriceTotal, pushOrderToDB }) => {



    const onAccept = () =>{
        pushOrderToDB(orderData);
        toggleReceiptModal();
    }
    const onCancel = () =>{

    }
    

    return (
        (flag)
            ? <div className={Styles.div_main}>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                        </tr>
                    </thead>


                    {orderData.map((el, index) => {
                        return (
                            <tr className={Styles.tr_order_item}>
                                <td>{el.name}</td>
                                <td>{el.orderQty}</td>
                                <td>{toCurrencyString(el.price)}</td>
                            </tr>
                        )
                    })}
                </table>

                <span className={Styles.span_customer_payment}>TOTAL: <span className={Styles.span_customer_payment_amount}>{toCurrencyString(orderPriceTotal)}</span></span>
                <span className={Styles.span_customer_payment}>CUSTOMER PAYMENT: <span className={Styles.span_customer_payment_amount}>{toCurrencyString(customerPayment)}</span></span>

                <button onClick={onAccept} className={Styles.btn_accept}>Accept</button>
                <button onClick={onCancel} className={Styles.btn_cancel}>Cancel</button>
            </div>
            : ""
    )
}

export default COMPONENT_MODAL_FINALIZE_ORDER;