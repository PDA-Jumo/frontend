import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import * as PieCharts from "../../styles/PieChart.js";
import { popularColors } from "./colorSelector.js";

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * popularColors.length);
  return popularColors[randomIndex];
}

export function PieChartComponent({ codeRatioArray, onHover, hoverdata }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const generatedColors = codeRatioArray.map(() => getRandomColor());
    setColors(generatedColors);
  }, [codeRatioArray]);

  return (
    <PieCharts.Container style={{ marginLeft: '50px', marginTop: '20px' }}>
      <PieChart width={200} height={200}>
        <Pie
          data={codeRatioArray}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={100}
          dataKey="percent"
          isAnimationActive={false}
        >
          {codeRatioArray.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index] || getRandomColor()}
              onMouseOver={() => onHover(entry)}
              style={{
                filter: hoverdata === entry.stock_name ? "brightness(150%)" : "none",
              }}
            />
          ))}
        </Pie>
      </PieChart>
    </PieCharts.Container>
  );
}
