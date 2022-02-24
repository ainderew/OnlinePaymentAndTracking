import React, {useState, useEffect} from "react";
import Styles from "./modal_add_item_information.module.scss";

import {fetcherPOST,fetcherGET} from "../../scripts/fetcher";

const COMPONENT_MODAL_ADD_ITEM_INFORMATION = ({ flag, toggleModalInfoFlag, toggleBlur, itemData, setItemData, passedBarcode, checkDBItems }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [wPrice, setWPrice] = useState("");
    const [sPrice, setSPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [barcode, setBarcode] = useState("");
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [itemID, setItemID] = useState("")


    useEffect(()=>{
        fetcherGET(process.env.REACT_APP_ROUTE_GET_CATEGORIES,(response)=>{
            setCategoryOptions(response)
        })
    },[])

    useEffect(()=>{
        if(itemData != null){
            setName(itemData.name)
            setCategoryID(itemData.categoryID)
            setQuantity(itemData.stockQty)
            setWPrice(itemData.wholesalePrice)
            setSPrice(itemData.price)
            setBrand(itemData.brand)
            setBarcode(itemData.barcode);
            setItemID(itemData.ID)
        }else{
            console.log("null")
        }
    },[itemData])

    useEffect(()=>{
        setBarcode(passedBarcode);
    },[passedBarcode])

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
            categoryID: categoryID,
            barcode: barcode,
            itemID: itemID
        }
        fetcherPOST(process.env.REACT_APP_ROUTE_EDIT_ITEM, data, (res)=>{
            console.log(res)
        })
        toggleModalInfoFlag();
        toggleBlur();
        clearStates();
        checkDBItems();
    }

    const onCancel = (setterArray) =>{
        clearStates()
        setItemData(null);
        toggleModalInfoFlag();
        toggleBlur();
    }

    const clearStates = () =>{
        const setterArray = [setName,setQuantity,setWPrice,setSPrice,setBrand,setBarcode,setCategoryID];
        setterArray.forEach(setter =>{
            setter("");
        })
    }



  return (flag) ? 
    (itemData != null) ? // if itemData is not null edit modal is rendered
    <div className={Styles.div_main_edit}>
      <label className={Styles.label} htmlFor="">Barcode</label>  
      <input onChange={(e)=>stateSetter(e,setBarcode)} value={barcode} className={Styles.input} type="text" placeholder="Barcode"/>
      <label className={Styles.label} htmlFor="">Item Name</label>  
      <input onChange={(e)=>stateSetter(e,setName)} value={name} className={Styles.input} type="text" placeholder="Item Name"/>
      <label className={Styles.label} htmlFor="">Stock Quantity</label>  
      <input onChange={(e)=>stateSetter(e,setQuantity)} value={quantity} className={Styles.input} type="text" placeholder="Quantity"/>
      <label className={Styles.label} htmlFor="">Wholesale Price</label>  
      <input onChange={(e)=>stateSetter(e,setWPrice)} value={wPrice} className={Styles.input} type="text" placeholder="Wholesale Price"/>
      <label className={Styles.label} htmlFor="">Store Price</label>  
      <input onChange={(e)=>stateSetter(e,setSPrice)} value={sPrice} className={Styles.input} type="text" placeholder="Store Price"/>
      <label className={Styles.label} htmlFor="">Brand</label>  
      <input onChange={(e)=>stateSetter(e, setBrand)} value={brand} className={Styles.input} type="text" placeholder="Brand"/>
      <label className={Styles.label} htmlFor="">Category</label>  
      <select onChange={(e)=>stateSetter(e, setCategoryID)} value={categoryID} className={Styles.select} name="" id="" placeholder="Category" >
        {/* options */}
        <option value="" selected disabled>Select Item Category</option>
        {categoryOptions.map((el,index) =>{
            return(
                <option key={index} value={el.id}>{el.name}</option>
            )
        })}
      </select>

      <button onClick={submit} className={Styles.btn_submit}>Done</button>
      <button onClick={()=>onCancel([setName,setQuantity,setWPrice,setSPrice,setBrand,setBarcode,setCategoryID])} className={Styles.btn_cancel}>Cancel</button>

    </div> 

    : <div className={Styles.div_main}>
      <input onChange={(e)=>stateSetter(e,setName)} value={name} className={Styles.input} type="text" placeholder="Item Name"/>
      <input onChange={(e)=>stateSetter(e,setQuantity)} value={quantity} className={Styles.input} type="text" placeholder="Quantity"/>
      <input onChange={(e)=>stateSetter(e,setWPrice)} value={wPrice} className={Styles.input} type="text" placeholder="Wholesale Price"/>
      <input onChange={(e)=>stateSetter(e,setSPrice)} value={sPrice} className={Styles.input} type="text" placeholder="Store Price"/>
      <input onChange={(e)=>stateSetter(e, setBrand)} value={brand} className={Styles.input} type="text" placeholder="Brand"/>
      <select onChange={(e)=>stateSetter(e, setCategoryID)} value={categoryID} className={Styles.select} name="" id="" placeholder="Category" >
        {/* options */}
        <option value="" selected disabled>Select Item Category</option>
        {categoryOptions.map((el,index) =>{
            return(
                <option key={index} value={el.id}>{el.name}</option>
            )
        })}
      </select>

      <button onClick={submit} className={Styles.btn_submit}>Done</button>
      <button onClick={()=>onCancel([setName,setQuantity,setWPrice,setSPrice,setBrand,setBarcode,setCategoryID])} className={Styles.btn_cancel}>Cancel</button>

    </div> 
  : "";
};

export default COMPONENT_MODAL_ADD_ITEM_INFORMATION;
