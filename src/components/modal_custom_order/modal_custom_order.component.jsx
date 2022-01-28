import React, { useState, useEffect } from "react"
import Styles from "./modal_custom_order.module.scss";

import { Item } from "../../scripts/Item";

const COMPONENT_MODAL_CUSTOM_ORDER = ({ flag, toggleCustomeOrderFlag, addItemToOrder }) => {

    const [itemName, setItemName] = useState("");
    const [brand, setBrand] = useState("");
    const [wholesalePrice, setWholesalePrice] = useState("");
    const [price, setPrice] = useState("");
    const [orderQuantity, setOrderQuantity] = useState("");



    const createCustomItem = () => {
        let input = inputEmptyChecker();

        if (input) {
            let inputField = document.getElementById(input);
            inputField.classList.add("input_blank");

            setTimeout(()=>{
                inputField.classList.remove("input_blank")
            },2000)

        } else {
            const customItem = new Item(0, itemName, brand, 0, wholesalePrice, price, 0, orderQuantity)
            addItemToOrder(customItem);
            clearValues();
        }
    }

    const setValue = (e, setter) => {
        setter(e.target.value)
    }

    const clearValues = () => {
        setItemName("")
        setBrand("")
        setWholesalePrice("")
        setPrice("")
        setOrderQuantity("")
    }

    const inputEmptyChecker = () => {
        if (itemName === "") {
            return "input_name"
        }else if (brand === ""){
            return "input_brand"
        }else if (wholesalePrice === "" || isNaN(wholesalePrice)){
            return "input_wholeSalePrice"
        }else if (price === "" || isNaN(price)){
            return "input_price"
        }else if (orderQuantity === "" || isNaN(orderQuantity) || orderQuantity === "0"){
            return "input_quantity"
        }

        return false
    }


    return (
        (flag)
            ?
            <div className={Styles.div_modal_custom_order}>
                <div className={Styles.row}>
                    <input onChange={(e) => setValue(e, setItemName)} name="item name" type="text" id="input_name" className={Styles.input} placeholder="Item Name" value={itemName} />
                </div>

                <div className={Styles.row}>
                    <input onChange={(e) => setValue(e, setBrand)} name="item name" type="text" id="input_brand" className={Styles.input} placeholder="Brand" value={brand} />
                </div>

                <div className={Styles.row}>
                    <input onChange={(e) => setValue(e, setOrderQuantity)} type="text" id="input_quantity" className={Styles.input} placeholder="Quantity" value={orderQuantity} />
                </div>
                <div className={Styles.row}>
                    <input onChange={(e) => setValue(e, setPrice)} type="text" id="input_price" className={Styles.input} placeholder="Item Price" value={price} />
                </div>
                <div className={Styles.row}>
                    <input onChange={(e) => setValue(e, setWholesalePrice)} type="text" id="input_wholeSalePrice" className={Styles.input} placeholder="Item Whole Sale Price" value={wholesalePrice} />
                </div>

                <button onClick={() => {
                    createCustomItem()
                }} className={`${Styles.btn} ${Styles.btn_done}`}>Done</button>

                <button onClick={toggleCustomeOrderFlag} className={Styles.btn}>Cancel</button>
            </div>
            : ""
    )
}

export default COMPONENT_MODAL_CUSTOM_ORDER;