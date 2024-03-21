import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import * as PieCharts from "../../styles/PieChart.js";
import { popularColors } from "./colorSelector.js";


function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * popularColors.length);
    return popularColors[randomIndex];
}

export function PieChartComponent({ codeRatioArray, onHover }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const generatedColors = codeRatioArray.map(() => getRandomColor());
    setColors(generatedColors);
  }, [codeRatioArray]); 

  console.log(codeRatioArray);

  return (
    <PieCharts.Container style={{ marginLeft: '50px', marginTop: '20px' }}>
      <PieChart width={200} height={200}>
        <Pie
          data={codeRatioArray}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={100}
          dataKey="percent" // 데이터 키는 실제 사용하는 데이터에 맞게 조정하세요.
          isAnimationActive={false}
        >
          {codeRatioArray.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index] || getRandomColor()} // colors 배열에서 색상을 가져오거나, 없으면 새로 생성
              onMouseOver={() => onHover(entry)}
            />
          ))}
        </Pie>
      </PieChart>
    </PieCharts.Container>
  );
}
