import React, { useState } from "react";
import Styles from "./inventory.module.scss";
// IMAGES
import IMG_search from "../../assets/search.svg";
import IMG_refresh from "../../assets/refresh.svg";
import IMG_sort from "../../assets/sort.svg";

// COMPONENTS
import COMPONENT_SEARCHBAR from "../../components/searchbar/searchbar.component";
import COMPONENT_MODAL_ADD_ITEM_BARCODE from "../../components/modal_add_item_barcode/modal_add_item_barcode.component";
import COMPONENT_MODAL_ADD_ITEM_INFORMATION from "../../components/modal_add_item_information/modal_add_item_information.component";

const PAGE_INVENTORY = ({ toggleBlur }) => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [barcodeFlag, setBarcodeFlag] = useState(false);
  const [modalInfoFlag, setModalInfoFlag] = useState(false);

  const toggleSearchBar = () => {
    setSearchToggle((prevState) => !prevState);
  };
  const toggleBarcodeFlag = () => {
    setBarcodeFlag((prevState) => !prevState);
  };
  const toggleModalInfoFlag = () => {
    setModalInfoFlag((prevState) => !prevState);
  };

  return (
    <div className={Styles.div_main}>
      <COMPONENT_MODAL_ADD_ITEM_BARCODE
        flag={barcodeFlag}
        toggleBarcodeFlag={toggleBarcodeFlag}
        toggleModalInfoFlag={toggleModalInfoFlag}
      />

      <COMPONENT_MODAL_ADD_ITEM_INFORMATION flag={modalInfoFlag} />

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
          <table className={Styles.table}>
            <thead>
              <tr className={Styles.table_header}>
                <th className={Styles.row_id}>ID</th>
                <th className={Styles.row_name}>Name</th>
                <th className={Styles.row_wPrice}>Wholesale Price</th>
                <th className={Styles.row_sPrice}>Store Price</th>
                <th className={Styles.row_actions}>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className={Styles.table_row}>
                <td>10156</td>
                <td>Kingston HyperX 2666Mhz 8GB DDR4 Ram</td>
                <td>P 1899.00</td>
                <td>P 2100.00</td>
                <td>example</td>
              </tr>
              <tr className={Styles.table_row}>
                <td>101</td>
                <td>example</td>
                <td>example</td>
                <td>example</td>
                <td>example</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PAGE_INVENTORY;
