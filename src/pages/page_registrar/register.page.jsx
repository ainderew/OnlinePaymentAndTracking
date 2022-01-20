import React, {useEffect, useState} from "react";

import {fetcher} from "../../scripts/fetcher";
import {createCategoryContainer} from "../../scripts/DOM";

// STYLES IMPORT
import "./register.style.scss";
import "../../SCSS/global.style.scss"
const Page_Register = () =>{
    // const endpoint = "https://mysql-pos.herokuapp.com/categories"

    useEffect(()=>{
        fetcher(process.env.REACT_APP_ROUTE_GET_CATEGORIES,(data,index)=>{
            createCategoryContainer(data,index)
        });

        console.log(process.env.REACT_APP_ROUTE_GET_CATEGORIES)
    },[])

    return(
        <div className="container_main">
            <div className="div_center">
                <div className="div_searchbar"></div>
                <div className="div_headers"></div>
                <div className="div_center_main">
                    <div className="center_left_categories grid_layout">

                    </div>
                    <div className="center_right_items"></div>
                </div>
            </div>
            <div className="div_order"></div>
        </div>
    )
}

export default Page_Register;