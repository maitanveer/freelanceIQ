export type JobPriorityWeights = {
  technical: number;
  experience: number;
  portfolio: number;
  clientQuality: number;
  budget: number;
  competition: number;
  risk: number;
};

export const defaultJobPriorityWeights: JobPriorityWeights = {
  technical: 30,
  experience: 20,
  portfolio: 20,
  clientQuality: 10,
  budget: 10,
  competition: 5,
  risk: 5,
};

export function calculateOpportunityScore(input: {
  technicalMatch: number;
  experienceMatch: number;
  portfolioMatch: number;
  clientQuality: number;
  budgetScore: number;
  competitionScore: number;
  riskScore: number;
  weights?: Partial<JobPriorityWeights>;
}) {
  const weights = { ...defaultJobPriorityWeights, ...input.weights };

  const technical = (input.technicalMatch * weights.technical) / 100;
  const experience = (input.experienceMatch * weights.experience) / 100;
  const portfolio = (input.portfolioMatch * weights.portfolio) / 100;
  const client = (input.clientQuality * weights.clientQuality) / 100;
  const budget = (input.budgetScore * weights.budget) / 100;
  const competition = ((100 - input.competitionScore) * weights.competition) / 100;
  const risk = ((100 - input.riskScore) * weights.risk) / 100;

  return Math.round(technical + experience + portfolio + client + budget + competition + risk);
}
