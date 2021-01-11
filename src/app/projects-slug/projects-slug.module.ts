import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { InViewportModule } from 'ng-in-viewport';

import { ProjectsSlugComponent } from './projects-slug.component';
import { CoverComponent } from './cover/cover.component';
import { InfosComponent } from './infos/infos.component';
import { IslandsComponent } from './islands/islands.component';
import { PictureComponent } from './picture/picture.component';
import { SliderComponent } from './slider/slider.component';
import { ThanksComponent } from './thanks/thanks.component';
import { NextProjectComponent } from './next-project/next-project.component';

const routes: Routes = [
  {
    path: ':slug',
    component: ProjectsSlugComponent,
  }
];

@NgModule({
  declarations: [
    ProjectsSlugComponent,
    CoverComponent,
    InfosComponent,
    IslandsComponent,
    PictureComponent,
    SliderComponent,
    ThanksComponent,
    NextProjectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    InViewportModule
  ]
})
export class ProjectsSlugModule { }
