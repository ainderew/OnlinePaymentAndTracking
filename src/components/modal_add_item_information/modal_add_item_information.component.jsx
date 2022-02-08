import React, {useState, useEffect} from "react";
import Styles from "./modal_add_item_information.module.scss";

import {fetcherPOST,fetcherGET} from "../../scripts/fetcher";

const COMPONENT_MODAL_ADD_ITEM_INFORMATION = ({ flag }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [wPrice, setWPrice] = useState("");
    const [sPrice, setSPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [categoryID, setCategoryID] = useState("");

    const [categoryOptions, setCategoryOptions] = useState([]);


    useEffect(()=>{
        fetcherGET(process.env.REACT_APP_ROUTE_GET_CATEGORIES,(response)=>{
            setCategoryOptions(response)
        })
    },[])

    const stateSetter = (e,setter) =>{
        setter(e.target.value);
    }

    const submit = () =>{
        const data = {
            name: name,
            stockQty: quantity,
            wholesalePrice: wPrice,
            price: sPrice,
            brand: brand,
            categoryID: categoryID
        }
        console.log(data);
        fetcherPOST(process.env.REACT_APP_ROUTE_ADD_ITEMS, data, (res)=>{
            console.log(res)
        })
    }



  return flag ? 
    <div className={Styles.div_main}>
      <input onChange={(e)=>stateSetter(e,setName)} value={name} className={Styles.input} type="text" placeholder="Item Name"/>
      <input onChange={(e)=>stateSetter(e,setQuantity)} value={quantity} className={Styles.input} type="text" placeholder="Quantity"/>
      <input onChange={(e)=>stateSetter(e,setWPrice)} value={wPrice} className={Styles.input} type="text" placeholder="Wholesale Price"/>
      <input onChange={(e)=>stateSetter(e,setSPrice)} value={sPrice} className={Styles.input} type="text" placeholder="Store Price"/>
      <input onChange={(e)=>stateSetter(e, setBrand)} value={brand} className={Styles.input} type="text" placeholder="Brand"/>
      <select onChange={(e)=>stateSetter(e, setCategoryID)} className={Styles.select} name="" id="" placeholder="Category" >
        {/* options */}
        <option value="" selected disabled>Select Item Category</option>
        {categoryOptions.map((el,index) =>{
            return(
                <option key={index} value={el.id}>{el.name}</option>
            )
        })}
      </select>

      <button onClick={submit} className={Styles.btn_submit}>Done</button>
      <button className={Styles.btn_cancel}>Cancel</button>

    </div> 
  : "";
};

export default COMPONENT_MODAL_ADD_ITEM_INFORMATION;
