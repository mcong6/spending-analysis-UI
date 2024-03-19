import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars({ dataSet, datakey }) {
  return (
    <BarChart
      dataset={dataSet}
      xAxis={[{ scaleType: "band", dataKey: datakey }]}
      series={[{ dataKey: "amount", label: "Amount" }]}
      width={1000}
      height={500}
    />
  );
}
