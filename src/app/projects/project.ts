
export interface Project {
  id: number;
  projectName: string;
  description: string;
}

export interface ProjectResolved {
  project: Project;
  error?: any;
}
