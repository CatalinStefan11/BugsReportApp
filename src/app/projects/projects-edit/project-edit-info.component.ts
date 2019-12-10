import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Project } from '../project';

@Component({
  templateUrl: './project-edit-info.component.html'
})
export class ProjectEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) projectForm: NgForm;

  errorMessage: string;
  project: Project;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.projectForm) {
        this.projectForm.reset();
      }

      this.project = data['resolvedData'].project;
    });
  }

}
