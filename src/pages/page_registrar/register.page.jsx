import React, {useEffect, useState} from "react";

import Component_Category_Container from "../../components/container_category/container_category.component"

import {fetcherGET, fetcherPOST} from "../../scripts/fetcher";
// import {createCategoryContainer} from "../../scripts/DOM";

// STYLES IMPORT
import "./register.style.scss";
import "../../SCSS/global.style.scss"
const Page_Register = () =>{
    
    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState([]);

    useEffect(()=>{
        fetcherGET(process.env.REACT_APP_ROUTE_GET_CATEGORIES,(fetchedData)=>{
            setData(fetchedData)
        });
        
    },[])

    const getItems = (categoryID) =>{
        fetcherPOST(process.env.REACT_APP_ROUTE_GET_CATEGORIES_ITEMS,categoryID, (data) =>{
            setItemData(data)
        })
    }




    return(
        <div className="container_main">
            <div className="div_center">
                <div className="div_searchbar"></div>
                <div className="div_headers"></div>
                <div className="div_center_main">
                    <div className="center_left_categories grid_layout">
                        {data.map((el,index)=>{
                            return <Component_Category_Container ParentData={el} index={index} getItemFetchFunction = {getItems} />
                        })}
                    </div>
                    <div className="center_right_items">
                        {console.log(itemData)};
                    </div>
                </div>
            </div>
            <div className="div_order"></div>
        </div>
    )
}

export default Page_Register;