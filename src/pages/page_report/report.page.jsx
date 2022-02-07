import React, { useState, useEffect } from "react";
import Styles from "./report.module.scss";

import { fetcherGET } from "../../scripts/fetcher";
import { toCurrencyString } from "../../scripts/DOM";

import COMPONENT_SEARCHBAR from "../../components/searchbar/searchbar.component";

const PAGE_REPORT = () => {
  const [mode, setMode] = useState(["viewAllOrders"]);
  const [dataSet, setDataSet] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [profit, setProfit] = useState();
  const [revenue, setRevenue] = useState();

  useEffect(() => {
    fetcherGET(
      `${process.env.REACT_APP_ROUTE_GET_ORDERS}/${mode}`,
      (fetchedData) => {
        setDataSet(fetchedData);
        calculateTotalRevenueAndTotalProfit(fetchedData);
      }
    );
  }, [mode]);

  const calculateRevenueAndProfit = (array) => {
    let data = {
      revenue: 0,
      cost: 0,
      profit: 0,
    };

    array.map((el) => {
      data.revenue += el.price * el.orderedQty;
      data.cost += el.wholesalePrice * el.orderedQty;
    });

    data.profit = data.revenue - data.cost;
    return data;
  };

  const calculateTotalRevenueAndTotalProfit = (dataSet) => {
    let totalRevenue = 0;
    let totalProfit = 0;

    dataSet.map((order) => {
      let itemCost = 0;
      let itemRevenue = 0;
      order.map((item) => {
        itemCost = item.wholesalePrice * item.orderedQty;
        itemRevenue = item.price * item.orderedQty;

        totalRevenue += item.price * item.orderedQty;
        totalProfit += itemRevenue - itemCost;
      });
    });
    setRevenue(totalRevenue);
    setProfit(totalProfit);
  };

  const getTableRowData = (index) =>{
    setRowData(dataSet[index]);
    console.log(rowData);
  }

  return (
    <div className={Styles.div_main}>
      <div className={Styles.div_searchbar}>
        <COMPONENT_SEARCHBAR />
        <div className={Styles.div_settings}></div>
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
                  <th>Date</th>
                  <th>Total Revenue</th>
                  <th>Profit</th>
                </tr>
              </thead>

              <tbody>
                {dataSet.map((order,index) => {
                  let businessData = calculateRevenueAndProfit(order);
                  let orderID = order[0].orderID; //all of the items inside the order array have the same orderID so we just get the first items orderID
                  let date = order[0].date;

                  return (
                    <tr onClick={()=>getTableRowData(index)} className={Styles.table_row}>
                      <td className={Styles.table_col_orderID}>{orderID}</td>
                      <td>{date}</td>
                      <td>{toCurrencyString(businessData.revenue)}</td>
                      <td>{toCurrencyString(businessData.profit)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={Styles.div_right}>
          {/* this here will be statistic that relate to the data on the left */}
          {rowData.map(el =>{
              return <span className={Styles.span_header}>{el.name}</span>
          })}
        </div>
      </div>
    </div>
  );
};

export default PAGE_REPORT;
