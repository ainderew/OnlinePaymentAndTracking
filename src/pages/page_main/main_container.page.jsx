import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


// PAGES
import PAGE_REGSITER from "../page_registrar/register.page"

// COMPONENTS
import COMPONENT_SIDEMENU from "../../components/side-menu/side_menu.component"
import COMPONENT_PAYMENT_DETAILS from "../../components/payment_details/payment_details.components";

const MainContainer = () => {

    const [blurFlag, setBlurFlag] = useState(false)
    const [printFlag, setPrintFlag] = useState(false);
    const [customerPayment, setCustomerpayment] = useState();

    const toggleBlurFlag = () => {
        setBlurFlag(prevState => !prevState);
    }

    const togglePrintFlag = () => {
        setPrintFlag(prevState => !prevState)
    }

    const getCustomerPayment = (payment) =>{
        setCustomerpayment(payment);
    }




    return (
        <Router>
            <COMPONENT_PAYMENT_DETAILS blurFlag={blurFlag} toggleBlurFlag={toggleBlurFlag} togglePrintFlag={togglePrintFlag} getCustomerPayment={getCustomerPayment} />
            <COMPONENT_SIDEMENU />
            <Routes>
                <Route path='/' element={<PAGE_REGSITER toggleBlurFlag={toggleBlurFlag} printFlag={printFlag} togglePrintFlag={togglePrintFlag} customerPayment={customerPayment} />} />
            </Routes>
        </Router>
    )
}

export default MainContainer;