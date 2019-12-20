import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../project';
import {User} from 'src/app/user/user2';
import { UserService } from 'src/app/user/user.service';

@Component({
  templateUrl: './project-edit-tags.component.html',
  styleUrls: ['./project-edit-tags.component.css']
})
export class ProjectEditTagsComponent implements OnInit {
  errorMessage: string;
  newTags = '';
  project: Project;
  tags : string[];
  users: User[];
  postUsersId: string;

  constructor(private route: ActivatedRoute, 
    private userService: UserService) { }

  ngOnInit(): void {
    // this.route.parent.data.subscribe(data => {
    //   this.project = data['resolvedData'].project;
    // });
    this.userService.getUsers().subscribe( (users) => {
      this.users = users;
    })

  }

  
  addTags(): void {
    if (!this.newTags) {
      this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
    } else {
      const tagArray = this.newTags.split(',');
 
      this.tags = this.tags ? this.tags.concat(tagArray) : tagArray;
      for(let user of this.users)
      {
          if(this.newTags == user.email)
          {
              
          }
      }
      this.newTags = '';
      this.errorMessage = '';
    }
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.tags.splice(idx, 1);
  }
}
