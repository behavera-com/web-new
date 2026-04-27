"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { DimensionResult } from "@/lib/scanner/scoring";

interface RiskRadarChartProps {
  results: DimensionResult[];
  showValues?: boolean;
}

export default function RiskRadarChart({
  results,
  showValues = false,
}: RiskRadarChartProps) {
  const allDimensions = [
    "Fluktuace",
    "Leadership",
    "Přetížení",
    "Engagement",
    "Komunikace",
    "Kultura",
  ];

  const data = allDimensions.map((label) => {
    const result = results.find((r) => r.label === label);
    return {
      dimension: showValues && result ? `${label} (${result.score})` : label,
      score: result?.score ?? 0,
      fullMark: 100,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: "#374151", fontSize: 13, fontWeight: 600 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Riziko"
          dataKey="score"
          stroke="#6C3CE0"
          fill="#6C3CE0"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={(props: Record<string, unknown>) => {
            const { cx, cy, index } = props as {
              cx: number;
              cy: number;
              index: number;
            };
            const result = results.find(
              (r) =>
                r.label ===
                allDimensions[index as number]
            );
            const color = result?.color ?? "#6C3CE0";
            return (
              <circle
                key={index as number}
                cx={cx as number}
                cy={cy as number}
                r={5}
                fill={color}
                stroke="white"
                strokeWidth={2}
              />
            );
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
