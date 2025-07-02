import React, { useMemo } from "react";
import styles from "./Dashboard.module.css";
import logo from "../assets/logo.png";
import { useEmployeeContext } from "../config/EmployeeContext";

const Dashboard = () => {
  const { employees } = useEmployeeContext();
  const employee = employees[0];

  const status = employee?.status || "Inactive";

  if (!employee) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const formatTime = (str) =>
    str
      ? new Date(str).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--I--";

  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString() : "--/--/----";

  const recentActivities = useMemo(() => {
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

    if (!employee?.leads) return [];

    const sorted = [...employee.leads]
      .filter((lead) => lead.activityType)
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.receivedDate) -
          new Date(a.updatedAt || a.receivedDate)
      );

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
  }, [employee]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="logo" />
        <div className={styles.greeting}>
          <p>Good Morning</p>
          <h1>
            {employee.firstName} {employee.lastName}
          </h1>
        </div>
      </div>

      <div className={styles.content}>
        <h2>Timings</h2>
        <div className={styles.timings}>
          <div>
            <p>Check In</p>
            <h4>{formatTime(employee.checkInTime)}</h4>
          </div>
          <div>
            <p>Check Out</p>
            <h4>{formatTime(employee.checkOutTime)}</h4>
          </div>
          <div>
            <p>Status</p>
            <h4
              style={{
                color: status === "Active" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {status}
            </h4>
          </div>
        </div>

        <h2>Break</h2>
        <div className={styles.break}>
          {employee.breaks && employee.breaks.length ? (
            employee.breaks.map((brk, i) => (
              <div key={i} className={styles.breakDetails}>
                <div className={styles.breakTime}>
                  <div>
                    <p>Break</p>
                    <h4>{formatTime(brk.start)}</h4>
                  </div>
                  <div>
                    <p>Ended</p>
                    <h4>{formatTime(brk.end)}</h4>
                  </div>
                </div>
                <div className={styles.breakDate}>
                  <p>Date</p>
                  <h4>{formatDate(brk.start)}</h4>
                </div>
              </div>
            ))
          ) : (
            <p style={{ opacity: 0.6 }}>No breaks recorded</p>
          )}
        </div>

        <h2>Recent Activity</h2>
        <div className={styles.activity}>
          <ul>
            {recentActivities.length ? (
              recentActivities.map((act) => (
                <li key={act.id}>
                  {act.message} - <span>{act.time}</span>
                </li>
              ))
            ) : (
              <li style={{ opacity: 0.6 }}>No activity found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
