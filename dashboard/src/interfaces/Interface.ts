export interface IViolation {
  id: number;
  name: string;
  rule_broken: string;
  amount: number;
  date: string;
}
export interface IFormattedViolation {
  member: string;
  rulesBroken: number;
  amount: number;
}

export interface ITeamComparison {
  name: string;
  violations: number;
  amount: number;
}
