import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import * as PieCharts from "../../styles/PieChart.js";
import { popularColors } from "./colorSelector.js";
import './portfolio.css';

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
    <PieCharts.Container style={{ marginTop: '20px' }}>
      <PieChart width={200} height={200}>
        <Pie
          data={codeRatioArray}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={100}
          dataKey="stock_assets"
          isAnimationActive={false}
        >
          {codeRatioArray.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index]} 
              onMouseOver={() => onHover(entry)}
            />
          ))}
        </Pie>
      </PieChart>
    </PieCharts.Container>
  );
}
