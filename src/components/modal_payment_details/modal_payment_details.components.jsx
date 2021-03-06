import React, { useState } from "react";
import "./modal_payment_details.style.scss";

const COMPONENT_PAYMENT_DETAILS = ({ flag, togglePaymentModal, toggleFinalizeModal, getCustomerPayment }) => {

    const [amount, setAmount] = useState(0)

    const buttonActions = (e) => {
        if (e.key === "Enter") {
            submit()
        } else if (e.key === "Escape") {
            togglePaymentModal();
        }
    }

    const submit = () => {
        getCustomerPayment(amount);
        // togglePaymentModal();
        toggleFinalizeModal();
    }

    return (
        (flag) ?
            <div className="div_payment_details print_hidden">
                <div className="payment_details_row">
                    <label htmlFor="customer_payment" className="label_customer_payment">Customer Payment Amount</label>
                    <input onKeyDown={buttonActions} onChange={(e) => setAmount(e.target.value)} name="customer_payment" autoFocus={true} type="text" placeholder="Customer Payment" className="input_payment_details" />
                </div>
                <button onClick={() => {
                    submit();
                }} className="btn_submit_payment_details">Done</button>

                <button onClick={() => {
                    togglePaymentModal();
                }} className="btn_cancel_payment_details">Cancel</button>
            </div>
            : ""
    )
}

export default COMPONENT_PAYMENT_DETAILS;