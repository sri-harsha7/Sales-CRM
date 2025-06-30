// import React from "react";
// import styles from "./Dashboard.module.css";
// import Card from "../components/Card";
// import { GrCurrency } from "react-icons/gr";
// import { IoPersonOutline } from "react-icons/io5";
// import { MdOutlineHandshake } from "react-icons/md";
// import { LiaTachometerAltSolid } from "react-icons/lia";

// import AnalyticsChart from "../components/charts/AnalyticsChart";
// import RecentActivityFeed from "../components/charts/RecentActivityFeed";
// import Table from "../components/Table";

// const URL = import.meta.env.VITE_BACKEND_URL;

// const Dashboard = () => {
//   return (
//     <div className={styles.analytics}>
//       <h2>Home {">"} Dashboard</h2>
//       <div className={styles.cards}>
//         <Card
//           icon={<GrCurrency />}
//           content={"Unassigned Leads"}
//           value={"04"}
//         ></Card>
//         <Card
//           icon={<IoPersonOutline />}
//           content={"Assigned This Week"}
//           value={"24"}
//         ></Card>
//         <Card
//           icon={<MdOutlineHandshake />}
//           content={"Active Salespeople"}
//           value={"5"}
//         ></Card>
//         <Card
//           icon={<LiaTachometerAltSolid />}
//           content={"Conversion Rate"}
//           value={"32%"}
//         ></Card>
//       </div>
//       <div className={styles.analyticsCards}>
//         <AnalyticsChart></AnalyticsChart>
//         <RecentActivityFeed></RecentActivityFeed>
//       </div>
//       <div className={styles.tables}>
//         <Table></Table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.jsx
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
import { useAdminContext } from "../config/AdminContext";
const Dashboard = () => {
  const { leads } = useAdminContext();
  const unassignedLeads = leads.filter((lead) => !lead.assignedTo).length;

  const assignedThisWeek = leads.filter((lead) => {
    if (!lead.receivedDate || !lead.assignedTo) return false;
    const date = new Date(lead.receivedDate);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return date >= startOfWeek;
  }).length;

  const activeSalespeople = new Set(
    leads.filter((lead) => lead.assignedTo).map((lead) => lead.assignedTo)
  ).size;

  const totalLeads = leads.length;
  const closedLeads = leads.filter(
    (lead) => lead.status?.toLowerCase() === "closed"
  ).length;

  const conversionRate =
    totalLeads === 0
      ? "0%"
      : `${Math.round((closedLeads / totalLeads) * 100)}%`;

  return (
    <div className={styles.analytics}>
      <h2>Home {">"} Dashboard</h2>

      <div className={styles.cards}>
        <Card
          icon={<GrCurrency />}
          content={"Unassigned Leads"}
          value={String(unassignedLeads).padStart(2, "0")}
        />
        <Card
          icon={<IoPersonOutline />}
          content={"Assigned This Week"}
          value={String(assignedThisWeek).padStart(2, "0")}
        />
        <Card
          icon={<MdOutlineHandshake />}
          content={"Active Salespeople"}
          value={String(activeSalespeople)}
        />
        <Card
          icon={<LiaTachometerAltSolid />}
          content={"Conversion Rate"}
          value={conversionRate}
        />
      </div>

      <div className={styles.analyticsCards}>
        <AnalyticsChart leads={leads} />
        <RecentActivityFeed leads={leads} />
      </div>

      <div className={styles.tables}>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
