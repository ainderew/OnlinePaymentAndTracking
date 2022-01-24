import React, {useState} from "react";
import "./payment_details.style.scss";

const COMPONENT_PAYMENT_DETAILS = ({ blurFlag, toggleBlurFlag, togglePrintFlag, getCustomerPayment }) => {

    const [amount, setAmount] = useState(0)

    const buttonActions = (e) =>{
        if (e.key === "Enter"){
            getCustomerPayment(amount);
            togglePrintFlag();
        }else if(e.key === "Escape"){
            toggleBlurFlag();
        }
    }

    return (
        (blurFlag) ?
            <div className="wrapper_payment_details blur print_hidden">
                <div className="div_payment_details">
                    <div className="payment_details_row">
                        <label htmlFor="customer_payment" className="label_customer_payment">Customer Payment Amount</label>
                        <input onKeyDown={buttonActions}  onChange={(e)=>setAmount(e.target.value)}  name="customer_payment" autoFocus={true} type="text" placeholder="Customer Payment" className="input_payment_details"/>
                    </div>
                    <button onClick={()=>{
                        getCustomerPayment(amount);
                        togglePrintFlag();
                    }} className="btn_submit_payment_details">Done</button>

                    <button onClick={()=>{
                        toggleBlurFlag();
                    }} className="btn_cancel_payment_details">Cancel</button>
                </div>
            </div>
            : ""
    )
}

export default COMPONENT_PAYMENT_DETAILS;