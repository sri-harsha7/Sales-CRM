import React from "react";
import styles from "./Dashboard.module.css";
import Card from "../components/Card";
import { GrCurrency } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineHandshake } from "react-icons/md";
import { LiaTachometerAltSolid } from "react-icons/lia";

import AnalyticsChart from "../components/charts/AnalyticsChart";
import RecentActivityFeed from "../components/charts/RecentActivityFeed";
import Table from "../components/Table";

const URL = import.meta.env.VITE_BACKEND_URL;

const Analytics = () => {
  return (
    <div className={styles.analytics}>
      <h2>Home {">"} Dashboard</h2>
      <div className={styles.cards}>
        <Card
          icon={<GrCurrency />}
          content={"Unassigned Leads"}
          value={"04"}
        ></Card>
        <Card
          icon={<IoPersonOutline />}
          content={"Assigned This Week"}
          value={"24"}
        ></Card>
        <Card
          icon={<MdOutlineHandshake />}
          content={"Active Salespeople"}
          value={"5"}
        ></Card>
        <Card
          icon={<LiaTachometerAltSolid />}
          content={"Conversion Rate"}
          value={"32%"}
        ></Card>
      </div>
      <div className={styles.analyticsCards}>
        <AnalyticsChart></AnalyticsChart>
        <RecentActivityFeed></RecentActivityFeed>
      </div>
      <div className={styles.tables}>
        {/* <table>
          <thead>
            <tr>
              <th>Chef Name</th>
              <th>Orders Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chef 1</td>
              <td>03</td>
            </tr>
            <tr>
              <td>Chef 2</td>
              <td>07</td>
            </tr>
            <tr>
              <td>Chef 3</td>
              <td>05</td>
            </tr>
            <tr>
              <td>Chef 4</td>
              <td>08</td>
            </tr>
          </tbody>
        </table> */}
        <Table></Table>
      </div>
    </div>
  );
};

export default Analytics;
