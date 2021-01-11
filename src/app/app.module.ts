import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollContainerComponent } from './scroll-container/scroll-container.component';
import { MobileComponent } from './mobile/mobile.component';
import { CanvasComponent } from './canvas/canvas.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ButtonComponent } from './button/button.component';
import { ProjectsFooterComponent } from './projects-footer/projects-footer.component';
import { LoaderComponent } from './loader/loader.component';
import { CanvasService } from './canvas/canvas.service';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollContainerComponent,
    MobileComponent,
    CanvasComponent,
    HeaderComponent,
    HomeComponent,
    ProjectComponent,
    ButtonComponent,
    ProjectsFooterComponent,
    LoaderComponent,
    AllProjectsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CanvasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
