import React from "react";
import styles from "./RecentActivityFeed.module.css";

const activities = [
  {
    id: 1,
    message: "You assigned a lead to Priya",
    time: "1 hour ago",
  },
  {
    id: 2,
    message: "Jay closed a deal",
    time: "2 hours ago",
  },
];

const RecentActivityFeed = () => {
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
