import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


// PAGES
import PAGE_REGSITER from "../page_registrar/register.page"
import PAGE_REPORT from "../page_report/report.page"
import PAGE_INVENTORY from "../page_inventory/inventory.page"

// COMPONENTS
import COMPONENT_SIDEMENU from "../../components/side-menu/side_menu.component"
import COMPONENT_BLUR from "../../components/blur/blur.component";

const MainContainer = () => {

    const [blurFlag, setBlurFlag] = useState(false)
    const [loadingFlag, setLoadingFlag] = useState(false);


    const toggleLoadingFlag = () =>{
        setLoadingFlag(prevState => !prevState);
    }

    

    const toggleBlur= () => {
        setBlurFlag(prevState => !prevState);
    }


   




    return (
        <Router>
            <COMPONENT_BLUR flag={blurFlag} />
            
            <COMPONENT_SIDEMENU />
            <Routes>
                <Route path='/' element={<PAGE_REGSITER toggleBlur={toggleBlur} loadingFlag={loadingFlag} toggleLoadingFlag={toggleLoadingFlag} />} />
                <Route path='/report' element={<PAGE_REPORT/>} />
                <Route path='/inventory' element={<PAGE_INVENTORY toggleBlur={toggleBlur} toggleLoadingFlag={toggleLoadingFlag} loadingFlag={loadingFlag}/>} />
            </Routes>
        </Router>
    )
}

export default MainContainer;