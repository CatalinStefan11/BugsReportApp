import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  pageTitle = 'You are developer in this projects';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  _listFilter = '';
 

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProjects = this.listFilter ? this.performFilter(this.listFilter) : this.projects;
  }

  filteredProjects: Project[] = [];
  projects: Project[] = [];
  

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute) { }


           

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.projectService.getProjects().subscribe({
      next: projects => {
        this.projects = projects;
        this.filteredProjects = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Project[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projects.filter((project: Project) =>
      project.projectName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
