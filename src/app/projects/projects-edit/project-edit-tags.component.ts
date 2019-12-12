import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../project';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  templateUrl: './project-edit-tags.component.html'
})
export class ProjectEditTagsComponent implements OnInit {
  // errorMessage: string;
  // newTags = '';
  // project: Project;

  constructor(private route: ActivatedRoute, 
    private authService: AuthService) { }

  ngOnInit(): void {
    // this.route.parent.data.subscribe(data => {
    //   this.project = data['resolvedData'].project;
    // });
  }

  
  // addTags(): void {
  //   if (!this.newTags) {
  //     this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
  //   } else {
  //     const tagArray = this.newTags.split(',');
  //  //   this.project.tags = this.project.tags ? this.project.tags.concat(tagArray) : tagArray;
  //     this.newTags = '';
  //     this.errorMessage = '';
  //   }
  // }

  // // Remove the tag from the array of tags.
  // removeTag(idx: number): void {
  //   this.project.tags.splice(idx, 1);
  // }
}
