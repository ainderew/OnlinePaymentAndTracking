import React, { useState, useEffect } from "react";
import Styles from "./report.module.scss";

import { fetcherGET } from "../../scripts/fetcher";

import COMPONENT_SEARCHBAR from "../../components/searchbar/searchbar.component";

const PAGE_REPORT = () => {

    const [mode, setMode] = useState(["viewAllOrders"])
    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {
        fetcherGET(`${process.env.REACT_APP_ROUTE_GET_ORDERS}/${mode}`, (fetchedData) => {
            setDataSet(fetchedData);
            console.log(fetchedData)
        })
        console.log(`${process.env.REACT_APP_ROUTE_GET_ORDERS}/${mode}`);
        console.log(dataSet);
    }, [mode])

    const calculateRevenueAndProfit = (array) => {
        let data = {
            revenue: 0,
            cost: 0,
            profit: 0
        }

        array.map(el => {
            data.revenue += el.price * el.orderedQty;
            data.cost += el.wholesalePrice * el.orderedQty;
        })

        data.profit = data.revenue - data.cost;
        return data;
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

                    </div>
                    <div className={Styles.div_table}>
                        <table className={Styles.table}>
                            <thead className={Styles.table_header}>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Total Revenue</th>
                                    <th>Profit</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataSet.map(order => {
                                    let businessData = calculateRevenueAndProfit(order)
                                    let orderID = order[0].orderID;
                                    let date = order[0].date;

                                    return (
                                        <tr>
                                            <td>{orderID}</td>
                                            <td>{date}</td>
                                            <td>{businessData.revenue}</td>
                                            <td>{businessData.profit}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className={Styles.div_right}>
                    {/* this here will be statistic that relate to the data on the left */}
                </div>
            </div>
        </div>
    )
}

export default PAGE_REPORT