import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import * as PieCharts from "../../styles/PieCharts";

export function PieChartComponent({ codeRatioArray, onHover }) {
  console.log(codeRatioArray);
  const COLORS = ["#D2E0FB", "#F9F3CC", "#D7E5CA", "#8EACCD"]; // 직접 설정한 색상

  return (
    <PieCharts.Container>
      <PieChart width={200} height={200}>
        <Pie
          data={codeRatioArray}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          dataKey="stock_assets"
          isAnimationActive={false}
        >
          {codeRatioArray.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              onMouseOver={() => onHover(entry)}
            />
          ))}
        </Pie>
      </PieChart>
    </PieCharts.Container>
  );
}
