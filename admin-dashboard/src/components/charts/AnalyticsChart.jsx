import React from "react";
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

const data = [
  { day: "Sat", percentage: 25 },
  { day: "Sun", percentage: 35 },
  { day: "Mon", percentage: 10 },
  { day: "Tue", percentage: 7 },
  { day: "Wed", percentage: 20 },
  { day: "Thu", percentage: 55 },
  { day: "Fri", percentage: 45 },
];

const AnalyticsChart = () => {
  return (
    <div className={styles.analyticsChart}>
      <h2 className={styles.title}>Sale Analytics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="percentage" fill="#9ca3af" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
