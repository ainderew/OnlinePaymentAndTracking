import React, { useState, useEffect } from "react";
import Styles from "./inventory.module.scss";

import { fetcherGET } from "../../scripts/fetcher";
import { toCurrencyString } from "../../scripts/DOM";

// IMAGES
import IMG_search from "../../assets/search.svg";
import IMG_refresh from "../../assets/refresh.svg";
import IMG_sort from "../../assets/sort.svg";
import IMG_delete from "../../assets/trash.svg";
import IMG_edit from "../../assets/edit.svg";

// COMPONENTS
import COMPONENT_SEARCHBAR from "../../components/searchbar/searchbar.component";
import COMPONENT_MODAL_ADD_ITEM_BARCODE from "../../components/modal_add_item_barcode/modal_add_item_barcode.component";
import COMPONENT_MODAL_ADD_ITEM_INFORMATION from "../../components/modal_add_item_information/modal_add_item_information.component";
import COMPONENT_LOADING_SPINNER from "../../components/loading/loading_spinner.component";

const PAGE_INVENTORY = ({ toggleBlur, toggleLoadingFlag, loadingFlag }) => {
  useEffect(() => {
    checkDBItems()
  }, []);

  const [itemsArray, setItemsArray] = useState([]);
  const [itemData, setItemData] = useState(null);
  const [barcode, setBarcode] = useState();

  const [searchToggle, setSearchToggle] = useState(false);
  const [barcodeFlag, setBarcodeFlag] = useState(false);
  const [modalInfoFlag, setModalInfoFlag] = useState(false);

  const checkDBItems = () =>{
    toggleLoadingFlag();
    fetcherGET(process.env.REACT_APP_ROUTE_GET_ALL_ITEMS, (response) => {
        setItemsArray(response);
        toggleLoadingFlag();
      });
  }
  const toggleSearchBar = () => {
    setSearchToggle((prevState) => !prevState);
  };
  const toggleBarcodeFlag = () => {
    setBarcodeFlag((prevState) => !prevState);
  };
  const toggleModalInfoFlag = () => {
    setModalInfoFlag((prevState) => !prevState);
  };
  const setDataForItemEdit = (index) =>{
    setItemData(itemsArray[index]);
  }

  return (
    <div className={Styles.div_main}>
      <COMPONENT_MODAL_ADD_ITEM_BARCODE
        flag={barcodeFlag}
        toggleBarcodeFlag={toggleBarcodeFlag}
        toggleModalInfoFlag={toggleModalInfoFlag}
        setBarcode={setBarcode}
      />

      <COMPONENT_MODAL_ADD_ITEM_INFORMATION
        flag={modalInfoFlag}
        toggleModalInfoFlag={toggleModalInfoFlag}
        toggleBlur={toggleBlur}
        itemData={itemData}
        setItemData={setItemData}
        passedBarcode={barcode}
        checkDBItems={checkDBItems}
      />

      <div className={Styles.div_left}></div>
      <div className={Styles.div_right}>
        <div className={Styles.div_top_bar}>
          <div className={Styles.div_searchbar}>
            {searchToggle ? (
              <COMPONENT_SEARCHBAR />
            ) : (
              <button onClick={toggleSearchBar} className={Styles.btn_search}>
                <img className={Styles.icon_search} src={IMG_search} alt="" />
              </button>
            )}
          </div>
          <div className={Styles.div_buttons}>
            <button className={Styles.btn_refresh}>
              <img
                src={IMG_refresh}
                alt="refresh"
                className={Styles.icon_refresh}
              />
            </button>

            <button className={Styles.btn_refresh}>
              <img src={IMG_sort} alt="sort" className={Styles.icon_refresh} />
            </button>

            <button
              onClick={() => {
                toggleBarcodeFlag();
                toggleBlur();
              }}
              className={Styles.btn_addItem}
            >
              Add item
            </button>
          </div>
        </div>
        <div className={Styles.div_table}>
            {(loadingFlag)
           ?<COMPONENT_LOADING_SPINNER flag={loadingFlag} /> :<table className={Styles.table}>
           <thead>
             <tr className={Styles.table_header}>
               <th className={Styles.col_header_id}>ID</th>
               <th className={Styles.col_header_name}>Name</th>
               <th className={Styles.col_header_wPrice}>Wholesale Price</th>
               <th className={Styles.col_header_sPrice}>Store Price</th>
               <th className={Styles.col_header_actions}>Actions</th>
             </tr>
           </thead>

            <tbody>
             {itemsArray.map((el,index) => {
               return (
                 <tr className={Styles.table_row}>
                   <td className={Styles.col_id}>{el.ID}</td>
                   <td>{el.name}</td>
                   <td>{toCurrencyString(el.wholesalePrice)}</td>
                   <td>{toCurrencyString(el.price)}</td>
                   <td className={Styles.col_actions}>
                     <button onClick={()=>{
                         setDataForItemEdit(index)
                         toggleBlur();
                         toggleModalInfoFlag();
                     }} className={Styles.btn_action}>
                       <img
                         className={Styles.img_action}
                         src={IMG_edit}
                         alt="edit"
                       />
                     </button>
                     <button className={Styles.btn_action}>
                       <img
                         className={Styles.img_action}
                         src={IMG_delete}
                         alt="delete"
                       />
                     </button>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>}
          
        </div>
      </div>
    </div>
  );
};

export default PAGE_INVENTORY;
