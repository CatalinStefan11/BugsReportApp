
export interface Project {
  id: number;
  projectName: string;
  description: string;
  projectRepo: string;
}

export interface Project2 {
  id: number;
  name: string;
  description: string;
  repo: string;
}

export interface ProjectResolved {
  project: Project;
  error?: any;
}
