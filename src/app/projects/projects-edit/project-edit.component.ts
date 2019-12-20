import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import { Project, ProjectResolved } from '../project';
import { ProjectService } from '../project.service';

@Component({
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  pageTitle = 'Project Edit';
  errorMessage: string;

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalProject) !== JSON.stringify(this.currentProject);
  }

  private currentProject: Project;
  private originalProject: Project;

  get project(): Project {
    return this.currentProject;
  }
  set project(value: Project) {
    this.currentProject = value;
 
    this.originalProject = value ? { ...value } : null;
  }

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: ProjectResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onProjectRetrieved(resolvedData.project);
    });
  }

  onProjectRetrieved(project: Project): void {
    this.project = project;

    if (!this.project) {
      this.pageTitle = 'No project found';
    } else {
      if (this.project.id === 0) {
        this.pageTitle = 'Add Project';
      } else {
        this.pageTitle = `Edit Project: ${this.project.projectName}`;
      }
    }
  }

  deleteProject(): void {
    if (this.project.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the project: ${this.project.projectName}?`)) {
        this.projectService.deleteProject(this.project.id).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentProject = null;
    this.originalProject = null;
  }

  saveProject(): void {
    if (this.isValid()) {
      if (this.project.id === 0) {
        this.projectService.createProject(this.project).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      } else {
        this.projectService.updateProject(this.project).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {

    this.reset();
    this.router.navigate(['/projects']);
  }

  validate(): void {
    this.dataIsValid = {};

    
    if (this.project.projectName &&
      this.project.projectName.length >= 3 &&
      this.project.projectRepo && this.project.description) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    
    
  }

}
