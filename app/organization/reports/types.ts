export type EngineerStatus = "active" | "inactive" | "review";

export interface EngineerProject {
  id: string | number;
  name: string;
  role: string;
  area: number;
  year: number;
  status: "done" | "running";
}

export interface EngineerResume {
  fileName: string;
  description: string;
  url?: string;
}

export interface Engineer {
  id: number;
  initial: string;
  name: string;
  field: string;
  specialties: string;
  level: number;
  experience: number;
  rating: number;
  completed: number;
  total: number;
  status: EngineerStatus;
  type: "real" | "legal";
  activeProjects: number;
  projects?: EngineerProject[];
  resume?: EngineerResume;
}