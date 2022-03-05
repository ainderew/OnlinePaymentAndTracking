import React, { useEffect, useState, useRef, Fragment } from "react";

import COMPONENT_CONTAINER_CATEGORY from "../../components/container_category/container_category.component"
import COMPONENT_CONTAINER_ITEM from "../../components/container_item/container_item.component";
import COMPONENT_CONTAINER_ORDER_ITEM from "../../components/container_order_item/container_order_item.component";
import COMPONENT_CONTAINER_CUSTOM_ORDER from "../../components/container_custom_order/container_custom_order.component";
import COMPONENT_MODAL_PAYMENT_DETAILS from "../../components/modal_payment_details/modal_payment_details.components";
import COMPONENT_MODAL_CUSTOM_ORDER from "../../components/modal_custom_order/modal_custom_order.component";
import COMPONENT_RECEIPT from "../../components/receipt/receipt.component";
import COMPONENT_LOADING_SPINNER from "../../components/loading/loading_spinner.component";
import COMPONENT_SEARCHBAR from "../../components/searchbar/searchbar.component";
import COMPONENT_MODAL_FINALIZE_ORDER from "../../components/modal_finalize_order/modal_finalize_order.component";
import COMPONENT_MODAL_ORDER_ITEM from "../../components/modal_order_item/modal_order_item.component";

import { fetcherGET, fetcherPOST } from "../../scripts/fetcher";
import { findRepeat, getOrderPriceTotal, toCurrencyString } from "../../scripts/DOM";
import { Item } from "../../scripts/Item"
// import {createCategoryContainer} from "../../scripts/DOM";

// STYLES IMPORT
import "./register.style.scss";
import "../../SCSS/global.style.scss"

const PAGE_REGISTER = ({ toggleBlur, loadingFlag, toggleLoadingFlag }) => {
    const REF_input_barcode = useRef(null)

    // useStates
    const [categoriesData, setCategoriesData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [orderPriceTotal, setOrderPriceTotal] = useState(0);
    const [customerPayment, setCustomerpayment] = useState();
    const [ReceiptBarcodeID, setReceiptBarcodeID] = useState();
    const [itemBarcode, setItemBarcode] = useState();
    const [selectedOrderItem, setSelectedOrderItem] = useState();
    const [orderItemSelectedIndex, setOrderItemSelectedIndex] = useState();


    const [paymentFlag, setPaymentFlag] = useState(false);
    const [finalizeFlag, setFinalizeFlag] = useState(false);
    const [printFlag, setPrintFlag] = useState(false);
    const [customOrderFlag, setCustomOrderFlag] = useState(false);
    const [categoryLoadingFlag, setCategoryLoadingFlag] = useState(false);
    const [editOrderItemFlag, setEditOrderItemFlag] = useState(false);


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
        setOrderPriceTotal(PriceTotal);
    }, [orderData])


    // Functions 
    const getItems = (categoryID) => {
        toggleLoadingFlag();
        fetcherPOST(process.env.REACT_APP_ROUTE_GET_CATEGORIES_ITEMS, categoryID, (data) => {
            setItemData(data)
            toggleLoadingFlag();
        })
    }

    const getItemUsingBarcode = (e, barcode) => {
        if (e.key === "Enter") {
            fetcherPOST(process.env.REACT_APP_ROUTE_GET_BARCODE_ITEM, barcode, (itemData) => {
                console.log(itemData[0])
                addItemToOrder(itemData[0]);
            })
            setItemBarcode("")
        }

    }

    const searchItems = (itemName) => {
        toggleLoadingFlag();
        fetcherPOST(process.env.REACT_APP_ROUTE_GET_NAME_ITEM, itemName, (data) => {
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

    const toggleCategoryLoading = () => {
        setCategoryLoadingFlag(prevState => !prevState)
    }

    const toggleFinalizeModal = () => {
        setFinalizeFlag(prevState => !prevState);
    }

    const toggleEditOrderItemModal = () => {
        setEditOrderItemFlag(prevState => !prevState);
    }
    const closeAllModal = () => {
        toggleBlur();
        setPaymentFlag(false);
        setPrintFlag(false);
        setFinalizeFlag(false);
    }

    const pushOrderToDB = (orderData) => {
        console.log(orderData);
        fetcherPOST(process.env.REACT_APP_ROUTE_UPLOAD_ORDERS, orderData, (response) => {
            setReceiptBarcodeID(response)
        })
    }


    const onChange = (e, setter) => {
        setter(e.target.value)
    }

    const focusInputBarcode = () => {
        REF_input_barcode.current.focus();
    }

    const onOrderItemClick = (index) => {
        setSelectedOrderItem(orderData[index]);
        setOrderItemSelectedIndex(index);
        toggleEditOrderItemModal();
    }

    const onSubmitEditOrderItem = (newItemData, index) => {
        orderData.splice(index, 1, newItemData)
    }

    const removeOrderItem = (index) => {
        let tempArray = [...orderData];
        tempArray.splice(index, 1);
        setOrderData(tempArray) // We use a tempArray to modify the orderData array before using it in setOrderData() to trigger useEffect
        // because directly modifying the orderData array results in bugs. (useEffect can't pick up changes) 

        toggleEditOrderItemModal();
    }








    return (
        <div className="wrapper">
            <COMPONENT_MODAL_CUSTOM_ORDER flag={customOrderFlag} toggleCustomeOrderFlag={toggleCustomeOrderFlag} addItemToOrder={addItemToOrder} />
            <COMPONENT_MODAL_PAYMENT_DETAILS flag={paymentFlag} togglePaymentModal={togglePaymentModal} toggleFinalizeModal={toggleFinalizeModal} getCustomerPayment={getCustomerPayment} />
            <COMPONENT_MODAL_FINALIZE_ORDER flag={finalizeFlag} togglePaymentModal={togglePaymentModal} toggleReceiptModal={toggleReceiptModal} orderData={orderData} customerPayment={customerPayment} orderPriceTotal={orderPriceTotal} pushOrderToDB={pushOrderToDB} />
            {(editOrderItemFlag)
                ? <COMPONENT_MODAL_ORDER_ITEM itemData={selectedOrderItem} flag={editOrderItemFlag} FUNCTION_toggleFlag={toggleEditOrderItemModal} FUNCTION_submit={onSubmitEditOrderItem} FUNCTION_removeItem={removeOrderItem} index={orderItemSelectedIndex} />
                : ""
            }
            <COMPONENT_RECEIPT flag={printFlag} orderData={orderData} pushOrderToDB={pushOrderToDB} customerPayment={customerPayment} toggleBlur={toggleBlur} closeAllModals={closeAllModal} clearOrderData={clearOrderData} orderPriceTotal={orderPriceTotal} ReceiptBarcodeID={ReceiptBarcodeID} />
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


                        <div className="center_left_categories grid_layout">
                            {(categoryLoadingFlag)
                                ? <COMPONENT_LOADING_SPINNER flag={categoryLoadingFlag} />
                                : <Fragment>
                                    <COMPONENT_CONTAINER_CUSTOM_ORDER toggleCustomeOrderFlag={toggleCustomeOrderFlag} toggleBlur={toggleBlur} />
                                    {categoriesData.map((el, index) => {
                                        return <COMPONENT_CONTAINER_CATEGORY ParentData={el} index={index} getItemFetchFunction={getItems} toggleLoadingFlag={toggleLoadingFlag} />
                                    })}
                                </Fragment>
                            }

                        </div>


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




                        <div className="center_right_items">

                            {(loadingFlag)
                                ? <COMPONENT_LOADING_SPINNER flag={loadingFlag} />
                                : itemData.map((el, index) => {
                                    return <COMPONENT_CONTAINER_ITEM data={el} addItemToOrderFunction={addItemToOrder} />
                                })}

                        </div>

                    </div>
                </div>
                <div className="div_order">

                    <div className="div_order_header">
                        <input ref={REF_input_barcode} onChange={(e) => { onChange(e, setItemBarcode) }} onKeyDown={(e) => { getItemUsingBarcode(e, itemBarcode) }} type="text" className="" id="input_barcode" value={itemBarcode} />
                        <button onClick={focusInputBarcode} className="btn_scan_barcode">TechPal</button>

                    </div>

                    <div className="div_order_main">
                        {orderData.map((el, index) => {
                            return < COMPONENT_CONTAINER_ORDER_ITEM itemData={el} index={index} FUNCTION_editOrderItem={onOrderItemClick} />
                        })}
                    </div>
                    <div onClick={togglePaymentModal} className="div_order_button center">
                        <span className="span_order_total">{toCurrencyString(orderPriceTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PAGE_REGISTER;