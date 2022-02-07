import React, { useEffect, useState } from "react";

import COMPONENT_CONTAINER_CATEGORY from "../../components/container_category/container_category.component"
import COMPONENT_CONTAINER_ITEM from "../../components/container_item/container_item.component";
import COMPONENT_CONTAINER_ORDER_ITEM from "../../components/container_order_item/container_order_item.component";
import COMPONENT_CONTAINER_CUSTOM_ORDER from "../../components/container_custom_order/container_custom_order.component";
import COMPONENT_MODAL_PAYMENT_DETAILS from "../../components/modal_payment_details/modal_payment_details.components";
import COMPONENT_MODAL_CUSTOM_ORDER from "../../components/modal_custom_order/modal_custom_order.component";
import COMPONENT_RECEIPT from "../../components/receipt/receipt.component";
import COMPONENT_LOADING_SPINNER from "../../components/loading/loading_spinner.component";
import COMPONENT_SEARCHBAR from "../../components/searchbar/searchbar.component";

import { fetcherGET, fetcherPOST } from "../../scripts/fetcher";
import { findRepeat, getOrderPriceTotal, toCurrencyString } from "../../scripts/DOM";
import { Item } from "../../scripts/Item"
// import {createCategoryContainer} from "../../scripts/DOM";

// STYLES IMPORT
import "./register.style.scss";
import "../../SCSS/global.style.scss"

const PAGE_REGISTER = ({ toggleBlur, loadingFlag, toggleLoadingFlag }) => {
    // useStates
    const [categoriesData, setCategoriesData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [orderdPriceTotal, setOrderPriceTotal] = useState(0);
    const [customerPayment, setCustomerpayment] = useState();

    const [paymentFlag, setPaymentFlag] = useState(false);
    const [printFlag, setPrintFlag] = useState(false);
    const [customOrderFlag, setCustomOrderFlag] = useState(false);
    const [categoryLoadingFlag, setCategoryLoadingFlag] = useState(false);


    // useEffects
    useEffect(() => {
        toggleCategoryLoading();
        fetcherGET(process.env.REACT_APP_ROUTE_GET_CATEGORIES, (fetchedData) => {
            setCategoriesData(fetchedData);
            toggleCategoryLoading();
        });

    }, [])

    useEffect(() => {
        let PriceTotal = getOrderPriceTotal(orderData)
        setOrderPriceTotal(toCurrencyString(PriceTotal));
    }, [orderData])


    // Functions 
    const getItems = (categoryID) => {
        toggleLoadingFlag();
        fetcherPOST(process.env.REACT_APP_ROUTE_GET_CATEGORIES_ITEMS, categoryID, (data) => {
            setItemData(data)
            toggleLoadingFlag();
        })
    }

    const searchItems = (itemName) =>{
        toggleLoadingFlag();
        fetcherPOST(process.env.REACT_APP_ROUTE_GET_CATEGORIES_ITEMS, itemName, (data) =>{
            setItemData(data);
            toggleLoadingFlag();
        })
    }

    const addItemToOrder = (itemData) => {
        let indexOfRepeatedItem = findRepeat(orderData, itemData)

        if (indexOfRepeatedItem === -1) {
            let item = new Item(itemData.ID, itemData.name, itemData.brand, itemData.categoryID, itemData.wholesalePrice, itemData.price, itemData.stockQty, 1);
            setOrderData((prevState) => [...prevState, item])
        } else {
            let prevArray = [...orderData]
            prevArray[indexOfRepeatedItem].orderQty += 1
            setOrderData(prevArray);
        }
    }

    const clearOrderData = () => {
        setOrderData([])
    }

    const getCustomerPayment = (payment) => {
        setCustomerpayment(payment);
    }

    const togglePaymentModal = () => {
        toggleBlur();
        setPaymentFlag(prevState => !prevState);
    }

    const toggleReceiptModal = () => {
        setPrintFlag(prevState => !prevState)
    }

    const toggleCustomeOrderFlag = () => {
        toggleBlur();
        setCustomOrderFlag(prevState => !prevState)
    }

    const toggleCategoryLoading = () =>{
        setCategoryLoadingFlag(prevState => !prevState)
    }

    const closeAllModal = () => {
        toggleBlur();
        setPaymentFlag(false);
        setPrintFlag(false);
    }

    const pushOrderTodDB = (orderData) =>{
        console.log(orderData);
        fetcherPOST(process.env.REACT_APP_ROUTE_UPLOAD_ORDERS, orderData, (response) =>{
            console.log(response)
        })
    }




    return (
        <div className="wrapper">
            <COMPONENT_MODAL_CUSTOM_ORDER flag={customOrderFlag} toggleCustomeOrderFlag={toggleCustomeOrderFlag} addItemToOrder={addItemToOrder} />
            <COMPONENT_MODAL_PAYMENT_DETAILS flag={paymentFlag} togglePaymentModal={togglePaymentModal} toggleReceiptModal={toggleReceiptModal} getCustomerPayment={getCustomerPayment} />

            <COMPONENT_RECEIPT flag={printFlag} orderData={orderData} pushOrderTodDB={pushOrderTodDB} customerPayment={customerPayment} toggleBlur={toggleBlur} closeAllModals={closeAllModal} clearOrderData={clearOrderData} />
            <div className="container_main print_hidden">
                <div className="div_center">
                    <div className="div_searchbar">
                        <COMPONENT_SEARCHBAR searchItems={searchItems} />
                    </div>
                    <div className="div_headers">
                        <div className="wrapper_left_header">
                            <span className="span_header bold">Categories</span>
                        </div>
                        <div className="wrapper_right_header">
                            <span className="span_header bold">Items</span>
                        </div>
                    </div>
                    <div className="div_center_main">
                        {(categoryLoadingFlag)
                            ? <COMPONENT_LOADING_SPINNER flag={categoryLoadingFlag} />
                            : <div className="center_left_categories grid_layout">
                                <COMPONENT_CONTAINER_CUSTOM_ORDER toggleCustomeOrderFlag={toggleCustomeOrderFlag} toggleBlur={toggleBlur} />
                                {categoriesData.map((el, index) => {
                                    return <COMPONENT_CONTAINER_CATEGORY ParentData={el} index={index} getItemFetchFunction={getItems} toggleLoadingFlag={toggleLoadingFlag} />
                                })}
                            </div>
                        }

                        {/* even if categories still fetching shows custom order container
                            problem: the loading component becomes a container due to scss
                        */}

                            {/* <div className="center_left_categories grid_layout">
                                <COMPONENT_CONTAINER_CUSTOM_ORDER toggleCustomeOrderFlag={toggleCustomeOrderFlag} toggleBlur={toggleBlur} />
                                <COMPONENT_LOADING_SPINNER flag={categoryLoadingFlag} />
                                {data.map((el, index) => {
                                    return <COMPONENT_CONTAINER_CATEGORY ParentData={el} index={index} getItemFetchFunction={getItems} toggleLoadingFlag={toggleLoadingFlag} />
                                })}
                            </div> */}


                        {(loadingFlag)
                            ? <COMPONENT_LOADING_SPINNER flag={loadingFlag} />
                            : <div className="center_right_items">

                                {itemData.map((el, index) => {
                                    return <COMPONENT_CONTAINER_ITEM data={el} addItemToOrderFunction={addItemToOrder} />
                                })}
                            </div>
                        }
                    </div>
                </div>
                <div className="div_order">
                    <div className="div_order_header"></div>
                    <div className="div_order_main">
                        {orderData.map((el, index) => {
                            return < COMPONENT_CONTAINER_ORDER_ITEM itemData={el} />
                        })}
                    </div>
                    <div onClick={togglePaymentModal} className="div_order_button center">
                        <span className="span_order_total">{orderdPriceTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PAGE_REGISTER;