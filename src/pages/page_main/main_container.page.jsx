import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// PAGES
import Page_Register from "../page_registrar/register.page"

// COMPONENTS
import Component_SideMenu from "../../components/side-menu/side_menu.component"

const MainContainer = () =>{
    return(
        <Router>
            <Component_SideMenu />
            <Routes>
                <Route path='/' element={<Page_Register/>} />
            </Routes>
        </Router>
    )
}

export default MainContainer;