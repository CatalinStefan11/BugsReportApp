import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from './project';
import { ProjectService } from './project.service';
import { AuthService } from '../user/auth.service';
import {User2} from '../user/user2'

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
  user12: User2 = {
    email: 'ronaldo@cristiano.com',
    password: 'asd'
  }

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private authService: AuthService) { }


           

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';


    this.projectService.getProjects().subscribe({
      next: projects => {
        this.projects = projects;
        console.log(projects)
        // this.filteredProjects = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });



    this.authService.getUsers().subscribe({
      next: users => console.log(users)
    })



    

    this.authService.createUser(this.user12).subscribe(data => {
      
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
