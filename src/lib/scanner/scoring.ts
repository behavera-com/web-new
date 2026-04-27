import type { Dimension } from "./questions";
import { questions } from "./questions";

export interface DimensionResult {
  key: Dimension;
  label: string;
  score: number;
  level: "low" | "medium" | "elevated" | "high";
  color: string;
  icon: string;
}

const dimensionQuestions: Record<Dimension, number[]> = {
  fluktuace: [2, 3, 10],
  leadership: [4],
  engagement: [5, 6],
  pretizeni: [7],
  kultura: [8, 10],
  komunikace: [5, 9],
};

const dimensionLabels: Record<Dimension, string> = {
  fluktuace: "Fluktuace",
  leadership: "Leadership",
  engagement: "Engagement",
  pretizeni: "Přetížení",
  kultura: "Kultura",
  komunikace: "Komunikace",
};

const dimensionIcons: Record<Dimension, string> = {
  fluktuace: "TrendingDown",
  leadership: "Users",
  engagement: "Heart",
  pretizeni: "AlertTriangle",
  kultura: "Compass",
  komunikace: "MessageCircle",
};

export function calculateResults(
  answers: Record<number, number>
): DimensionResult[] {
  const results: DimensionResult[] = [];

  for (const [dim, qIds] of Object.entries(dimensionQuestions)) {
    const scores: number[] = [];
    for (const qId of qIds) {
      const answerIndex = answers[qId];
      const question = questions.find((q) => q.id === qId);
      if (question && answerIndex !== undefined) {
        const dimScore =
          question.answers[answerIndex].scores[dim as Dimension];
        if (dimScore) scores.push(dimScore);
      }
    }

    if (scores.length === 0) continue;

    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const normalizedScore = Math.round(((avg - 1) / 3) * 100);

    let level: DimensionResult["level"];
    let color: string;
    if (normalizedScore <= 25) {
      level = "low";
      color = "#2DDBA6";
    } else if (normalizedScore <= 50) {
      level = "medium";
      color = "#FFB800";
    } else if (normalizedScore <= 75) {
      level = "elevated";
      color = "#FF7A00";
    } else {
      level = "high";
      color = "#E53E3E";
    }

    results.push({
      key: dim as Dimension,
      label: dimensionLabels[dim as Dimension],
      score: normalizedScore,
      level,
      color,
      icon: dimensionIcons[dim as Dimension],
    });
  }

  return results.sort((a, b) => b.score - a.score);
}

export function calculateOverallScore(results: DimensionResult[]): number {
  if (results.length === 0) return 0;
  return Math.round(
    results.reduce((sum, r) => sum + r.score, 0) / results.length
  );
}
