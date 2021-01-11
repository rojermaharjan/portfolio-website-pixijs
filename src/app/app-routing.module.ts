import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { name: 'index' } },
  { path: 'allprojects', component: AllProjectsComponent, data: { name: 'allprojects' } },
  { path: 'about', component: AboutComponent, data: { name: 'about'} },
  { path: 'projects', loadChildren: './projects-slug/projects-slug.module#ProjectsSlugModule', data: { name: 'projects-slug' } },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
