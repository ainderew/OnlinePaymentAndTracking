import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


// PAGES
import PAGE_REGSITER from "../page_registrar/register.page"

// COMPONENTS
import COMPONENT_SIDEMENU from "../../components/side-menu/side_menu.component"
import COMPONENT_BLUR from "../../components/blur/blur.component";

const MainContainer = () => {

    const [blurFlag, setBlurFlag] = useState(false)

    

    const toggleBlur= () => {
        setBlurFlag(prevState => !prevState);
        console.log("blur was toggled");
    }


   




    return (
        <Router>
            <COMPONENT_BLUR flag={blurFlag} />
            
            <COMPONENT_SIDEMENU />
            <Routes>
                <Route path='/' element={<PAGE_REGSITER toggleBlur={toggleBlur} />} />
            </Routes>
        </Router>
    )
}

export default MainContainer;