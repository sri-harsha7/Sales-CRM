import React, { useMemo } from "react";
import styles from "./AnalyticsChart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getDateKey = (date) => {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
  });
};

const AnalyticsChart = ({ leads }) => {
  const chartData = useMemo(() => {
    const now = new Date();
    const pastDays = 7 + Math.floor(Math.random() * 7); // 7–13 days
    const dateMap = {};

    for (let i = pastDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = getDateKey(d);
      dateMap[key] = 0;
    }

    leads.forEach((lead) => {
      if (!lead.receivedDate) return;
      const d = new Date(lead.receivedDate);
      const key = getDateKey(d);
      if (dateMap.hasOwnProperty(key)) {
        dateMap[key]++;
      }
    });

    return Object.entries(dateMap).map(([day, count]) => ({
      day,
      percentage: count,
    }));
  }, [leads]);

  return (
    <div className={styles.analyticsChart}>
      <h2 className={styles.title}>Sale Analytics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} leads`} />
          <Bar dataKey="percentage" fill="#9ca3af" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
