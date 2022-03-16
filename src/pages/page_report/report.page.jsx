import React, { useState, useEffect, useRef } from "react";
import Styles from "./report.module.scss";
// import "../../SCSS/global.style.scss";

import { fetcherGET } from "../../scripts/fetcher";
import { toCurrencyString, mergeSortTopDown } from "../../scripts/DOM";

// COMPONENTE
import COMPONENT_SEARCHBAR from "../../components/searchbar/searchbar.component";
import COMPONENT_LOADING_SPINNER from "../../components/loading/loading_spinner.component";
import { Fragment } from "react/cjs/react.production.min";

const PAGE_REPORT = () => {
  // const [mode, setMode] = useState(["viewAllOrders"]);

  const [dataSet, setDataSet] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [profit, setProfit] = useState();
  const [revenue, setRevenue] = useState();
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [advancedFilterFlag, setAdvancedFilterFlag] = useState(false);

  // SELECT INPUT VALUES
  const [filterByCurrent, setFilterByCurrent] = useState("Month");
  const [activeFilterButton, setActiveFilterButton] = useState(2); //since the first element is the span (index 0)
  const [monthFilter, setMonthFilter] = useState();
  const [yearFilter, setYearFilter] = useState();

  // useRefs
  const btnList = useRef(null)
  const initialRender = useRef(true);

  //default route when report page is loaded is current month
  useEffect(() => {
    initDataSet(process.env.REACT_APP_ROUTE_GET_ORDERS_CURRENT_MONTH);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false; //Checks if it's the first render, if true then it does not reload the data else reloads data with the current filter inside the useState
      console.log("initial")
    } else {
      initDataSet(`${process.env.REACT_APP_ROUTE_GET_ORDERS_CURRENT}${filterByCurrent}`)

    }
  }, [filterByCurrent])



  // Start of Functions - - - - - - 
  const initDataSet = (ENDPOINT) => {
    console.log(ENDPOINT)
    toggleLoading()
    fetcherGET(ENDPOINT, (fetchedData) => {
      let sortedDataSet = mergeSortTopDown(fetchedData)
      setDataSet(sortedDataSet);
      calculateTotalRevenueAndTotalProfit(fetchedData)
      toggleLoading();
    })

  }
  const calculateRevenueAndProfit = (array) => {
    let data = {
      revenue: 0,
      cost: 0,
      profit: 0,
    };

    array.filter(el => el.price != null).map((el) => {
      data.revenue += el.price * el.orderedQty;
      data.cost += el.wholesalePrice * el.orderedQty;
    });

    data.profit = data.revenue - data.cost;
    return data;
  };

  const calculateTotalRevenueAndTotalProfit = (fetchedData) => {
    let totalRevenue = 0;
    let totalProfit = 0;

    fetchedData.map((order) => {
      let itemCost = 0;
      let itemRevenue = 0;
      order.filter(el => el.price != null).map((item) => {
        itemCost = item.wholesalePrice * item.orderedQty;
        itemRevenue = item.price * item.orderedQty;

        totalRevenue += item.price * item.orderedQty;
        totalProfit += itemRevenue - itemCost;
      });
    });
    setRevenue(totalRevenue);
    setProfit(totalProfit);
  };

  const getTableRowData = (index) => {
    setRowData(dataSet[index]);
    // console.log(rowData);
  }

  const changeActiveButton = () => {
    [...btnList.current.children].map(el => el.classList.remove("active"))
    btnList.current.children[activeFilterButton].classList.add("active");
  }

  const changeCurrentFilter = (filter, index) => {
    setFilterByCurrent(filter); //changes the filter applied to the url
    setActiveFilterButton(index) // sets the index of the button that will have the active class
  }

  const onChangeMonth = (e) => {
    setMonthFilter(e.target.value);
  }

  const onChangeYear = (e) => {
    setYearFilter(e.target.value)
  }

  const btnPress_applyFilter = () => {
    toggleLoading()
    fetcherGET(`${process.env.REACT_APP_ROUTE_GET_ORDERS_SPECIFIC}${monthFilter}/${yearFilter}`, (fetchedData) => {
      let sortedData = mergeSortTopDown(fetchedData);
      setDataSet(sortedData);
      calculateTotalRevenueAndTotalProfit(fetchedData);
      toggleLoading();
    })
  }

  const btnPress_Back = () => {
    toggleAdvancedFilterFlag();
    initDataSet(process.env.REACT_APP_ROUTE_GET_ORDERS_CURRENT_MONTH);
    // btnList.current.children[2].classList.add("active");
    // btnList.current.children[2].classList.add("active");
  }

  const keyEnter_applyFilter = (e) => {
    if (e.key === "Enter") {
      btnPress_applyFilter();
    }
  }

  useEffect(() => {
    changeActiveButton();
  }, [activeFilterButton])



  const toggleLoading = () => {
    setLoadingFlag(prev => !prev);
  }

  const toggleAdvancedFilterFlag = () => {
    setAdvancedFilterFlag(prev => !prev);
  }


  return (
    <div className={Styles.div_main}>
      <div className={Styles.div_searchbar}>
        <COMPONENT_SEARCHBAR />
        <div ref={btnList} className={Styles.div_settings}>
          <span className={Styles.span_settings}>Filter by</span>

          {(advancedFilterFlag)
            ?
            <Fragment>
              <select onChange={onChangeMonth} className={Styles.btn_settings}>
                <option className={Styles.option} value="" disabled selected>Month</option>
                <option className={Styles.option} value="Jan" >January</option>
                <option className={Styles.option} value="Feb" >February</option>
                <option className={Styles.option} value="Mar" >March</option>
                <option className={Styles.option} value="Apr" >April</option>
                <option className={Styles.option} value="May" >May</option>
                <option className={Styles.option} value="Jun" >June</option>
                <option className={Styles.option} value="Jul" >July</option>
                <option className={Styles.option} value="Aug" >August</option>
                <option className={Styles.option} value="Sep" >September</option>
                <option className={Styles.option} value="Oct" >October</option>
                <option className={Styles.option} value="Nov" >November</option>
                <option className={Styles.option} value="Dec" >December</option>
              </select>

              <input onChange={onChangeYear} onKeyDown={(e) => keyEnter_applyFilter(e)} className={Styles.input_settings} type="text" placeholder="Enter Year" value={yearFilter} />
            </Fragment>
            :
            <Fragment>
              <button onClick={() => changeCurrentFilter("Year", 1)} className={Styles.btn_settings}>Year</button>
              <button onClick={() => changeCurrentFilter("Month", 2)} className={`${Styles.btn_settings} active`}>Month</button>
              <button onClick={() => changeCurrentFilter("Day", 3)} className={Styles.btn_settings}>Day</button>
            </Fragment>
          }

          {(advancedFilterFlag)
            ?
            <Fragment>
              <button onClick={btnPress_applyFilter} className={Styles.btn_settings}>Apply</button>
              <button onClick={btnPress_Back} className={Styles.btn_settings}>Back</button>
            </Fragment>
            : <button onClick={toggleAdvancedFilterFlag} className={Styles.btn_settings}>Change Specific Filter</button>
          }



        </div>
      </div>
      <div className={Styles.div_content}>
        <div className={Styles.div_left}>
          {/* table that contains all the data of the orders */}
          <div className={Styles.div_summary}>
            <span className={Styles.span_header}>Financial Report</span>
            <div className={Styles.div_financial_report}>
              <div className={Styles.div_revenue}>
                <span className={Styles.span_sub_header}>Revenue</span>
                <span className={Styles.span_amount}>{toCurrencyString(revenue)}</span>
                <span className={Styles.span_subtext}>
                  <span className={Styles.span_change_indicator_up}>up 5%</span>{" "}
                  vs last month
                </span>
              </div>
              <div className={Styles.div_profit}>
                <span className={Styles.span_sub_header}>Profit</span>
                <span className={Styles.span_amount}>{toCurrencyString(profit)}</span>
                <span className={Styles.span_subtext}>
                  <span className={Styles.span_change_indicator_up}>up 5%</span>{" "}
                  vs last month
                </span>
              </div>
            </div>
            <span className={Styles.span_subtext}>Sales sorted by month</span>
          </div>
          <div className={Styles.div_table}>
            <table className={Styles.table}>
              <thead className={Styles.table_header}>
                <tr>
                  <th className={Styles.table_col_orderID} >Order ID</th>
                  <th className={Styles.table_col_Date} >Date</th>
                  <th className={Styles.table_col_Time} >Time</th>
                  <th className={Styles.table_col_Revenue} >Total Revenue</th>
                  <th className={Styles.table_col_Profit} >Profit</th>
                </tr>
              </thead>

              <tbody className={Styles.table_body}>
                {(loadingFlag)
                  ? <COMPONENT_LOADING_SPINNER flag={loadingFlag} />
                  : dataSet.map((order, index) => {
                    let businessData = calculateRevenueAndProfit(order);
                    let orderID = order[0].orderID; //all of the items inside the order array have the same orderID so we just get the first items orderID
                    let date = order[0].Date;
                    let time = order[0].Time;

                    return (
                      <tr onClick={() => getTableRowData(index)} className={Styles.table_row}>
                        <td className={Styles.table_col_orderID} >{orderID}</td>
                        <td className={Styles.table_col_Date} >{date}</td>
                        <td className={Styles.table_col_Time} >{time}</td>
                        <td className={Styles.table_col_Revenue} >{toCurrencyString(businessData.revenue)}</td>
                        <td className={Styles.table_col_Profit} >{toCurrencyString(businessData.profit)}</td>
                      </tr>
                    );
                  })}

              </tbody>
            </table>
          </div>
        </div>

        <div className={Styles.div_right}>
          {/* this here will be statistic that relate to the data on the left */}
          {rowData.map(el => {
            return <span className={Styles.span_header}>{el.name}</span>
          })}
        </div>
      </div>
    </div >
  );
};

export default PAGE_REPORT;
