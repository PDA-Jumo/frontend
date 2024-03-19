import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import * as PieCharts from "../../styles/PieCharts";

export function PieChartComponent({ codeRatioArray }) {
  console.log(codeRatioArray);
  const COLORS = ["#FCD8D4", "#FDF6F0", "#F8E2CF", "#F5C6AA"]; // 직접 설정한 색상

  return (
    
      <PieCharts.Container>
        <PieCharts.PieWrapper>
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
                />
              ))}
            </Pie>
          </PieChart>
        </PieCharts.PieWrapper>
      </PieCharts.Container>
  );
}
