import { React, useState } from "react";
import Styles from "./modal_order_item.module.scss"

const COMPONENT_MODAL_ORDER_ITEM = ({ itemData, flag, FUNCTION_toggleFlag, FUNCTION_submit, FUNCTION_removeItem, index }) => {
    const [itemQuantity, setItemQuantity] = useState(itemData.orderQty)

    const setter = (e) => {
        setItemQuantity(e.target.value)
        itemData.orderQty = e.target.value;
    }

    const enterPressed = (e) => {
        if (e.key === "Enter") {
            FUNCTION_submit(itemData,index)
            FUNCTION_toggleFlag();
        }
    }

    return (
        <div className={Styles.div_main}>
            <span className={Styles.span_header}>Item Name: <br />
                <span className={Styles.span_data}>{itemData.name}</span>
                {/* <span className={Styles.span_data}>Kingston A400 120GB Sata SSD</span> */}
            </span>
            <span className={Styles.span_header}>Quantity:</span>
            <input className={Styles.input_qty} onKeyDown={enterPressed} onChange={(e) => setter(e)} type="number" value={itemQuantity} autoFocus={true} />
            {/* <input className={Styles.input_qty} onKeyDown={enterPressed} onChange={(e) => setter(e)} type="number" value={itemData.orderQty} /> */}

            <button onClick={()=>FUNCTION_removeItem(index)} className={Styles.btn_delete}>Remove Item</button>
            <button onClick={FUNCTION_toggleFlag} className={Styles.btn_delete}>Cancel</button>
        </div>

    )
}


export default COMPONENT_MODAL_ORDER_ITEM;