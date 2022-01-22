import React, { useEffect, useState } from "react";

import COMPONENT_CONTAINER_CATEGORY from "../../components/container_category/container_category.component"
import COMPONENT_CONTAINER_ITEM from "../../components/container_item/container_item.component";
import COMPONENT_CONTAINER_ORDER_ITEM from "../../components/container_order_item/container_order_item.component";

import { fetcherGET, fetcherPOST } from "../../scripts/fetcher";
import { findRepeat, getOrderPriceTotal,toCurrencyString } from "../../scripts/DOM";
import { Item } from "../../scripts/Item"
// import {createCategoryContainer} from "../../scripts/DOM";

// STYLES IMPORT
import "./register.style.scss";
import "../../SCSS/global.style.scss"
const Page_Register = () => {

    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [orderdPriceTotal, setOrderPriceTotal] = useState(0);

    useEffect(() => {
        fetcherGET(process.env.REACT_APP_ROUTE_GET_CATEGORIES, (fetchedData) => {
            setData(fetchedData)
        });

    }, [])

    useEffect(()=>{
        let PriceTotal = getOrderPriceTotal(orderData)
        setOrderPriceTotal(toCurrencyString(PriceTotal));
    },[orderData])


    const getItems = (categoryID) => {
        fetcherPOST(process.env.REACT_APP_ROUTE_GET_CATEGORIES_ITEMS, categoryID, (data) => {
            setItemData(data)
        })
    }

    const addItemToOrder = (itemData) => {
        let indexOfRepeatedItem = findRepeat(orderData, itemData)

        if (indexOfRepeatedItem === -1) {
            let item = new Item(itemData.ID, itemData.name, itemData.brand, itemData.categoryID, itemData.price, itemData.stockQty, 1);
            setOrderData((prevState) => [...prevState, item])
        }else{
            let prevArray = [...orderData]
            prevArray[indexOfRepeatedItem].orderQty += 1
            setOrderData(prevArray);

        }

    }






    return (
        <div className="container_main">
            <div className="div_center">
                <div className="div_searchbar"></div>
                <div className="div_headers">
                    <div className="wrapper_left_header">
                        <span className="span_header bold">Categories</span>
                    </div>
                    <div className="wrapper_right_header">
                        <span className="span_header bold">Items</span>
                    </div>
                </div>
                <div className="div_center_main">
                    <div className="center_left_categories grid_layout">
                        {data.map((el, index) => {
                            return <COMPONENT_CONTAINER_CATEGORY ParentData={el} index={index} getItemFetchFunction={getItems} />
                        })}
                    </div>
                    <div className="center_right_items">
                        {itemData.map((el, index) => {
                            return <COMPONENT_CONTAINER_ITEM data={el} addItemToOrderFunction={addItemToOrder} />
                        })}
                    </div>
                </div>
            </div>
            <div className="div_order">
                <div className="div_order_header"></div>
                <div className="div_order_main">
                    {orderData.map((el, index) => {
                        return < COMPONENT_CONTAINER_ORDER_ITEM itemData={el} />
                    })}
                </div>
                <div className="div_order_button center">
                    <span className="span_order_total">{orderdPriceTotal}</span>
                </div>
            </div>
        </div>
    )
}

export default Page_Register;