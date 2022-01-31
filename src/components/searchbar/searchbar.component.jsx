import React, {useState} from "react"
import Styles from "./searchbar.module.scss";

const COMPONENT_SEARCHBAR = ({searchItems}) =>{
    const [searchQuery, setSearchQuery] = useState("")

    const setter = (e) =>{
        setSearchQuery(e.target.value);
    }

    const enterPressed = (e) =>{
        if(e.key === "Enter"){
            searchItems(searchQuery)
            // console.log(searchQuery)
        }
    }
    return(
        <input className={Styles.input} type="text" onKeyDown={enterPressed} onChange={setter} value={searchQuery} placeholder="Search for item" />
    )
}

export default COMPONENT_SEARCHBAR