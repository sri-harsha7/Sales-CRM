// import React from "react";
// import styles from "./RecentActivityFeed.module.css";

// const activities = [
//   {
//     id: 1,
//     message: "You assigned a lead to Priya",
//     time: "1 hour ago",
//   },
//   {
//     id: 2,
//     message: "Jay closed a deal",
//     time: "2 hours ago",
//   },
// ];

// const RecentActivityFeed = () => {
//   return (
//     <div className={styles.recentActivity}>
//       <h2 className={styles.title}>Recent Activity</h2>
//       <ul className={styles.activityList}>
//         {activities.map((activity) => (
//           <li key={activity.id}>
//             <div>{activity.message}</div>
//             <div>{activity.time}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecentActivityFeed;

// src/components/charts/RecentActivityFeed.jsx
import React, { useMemo } from "react";
import styles from "./RecentActivityFeed.module.css";

const RecentActivityFeed = ({ leads }) => {
  const activities = useMemo(() => {
    const sorted = [...leads]
      .filter((lead) => lead.activityType)
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.receivedDate) -
          new Date(a.updatedAt || a.receivedDate)
      );

    const formatTimeAgo = (date) => {
      const seconds = Math.floor((new Date() - new Date(date)) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
      if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      if (minutes > 0) return `${minutes} min ago`;
      return "Just now";
    };

    return sorted.slice(0, 10).map((lead, index) => {
      let action = "Added a lead";
      if (lead.activityType === "assigned")
        action = `Assigned to ${lead.assignedToName || "someone"}`;
      if (lead.activityType === "closed") action = `Closed a lead`;

      return {
        id: lead._id || index,
        message: `${lead.name} - ${action}`,
        time: formatTimeAgo(lead.updatedAt || lead.receivedDate),
      };
    });
  }, [leads]);

  return (
    <div className={styles.recentActivity}>
      <h2 className={styles.title}>Recent Activity</h2>
      <ul className={styles.activityList}>
        {activities.map((activity) => (
          <li key={activity.id}>
            <div>{activity.message}</div>
            <div>{activity.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
