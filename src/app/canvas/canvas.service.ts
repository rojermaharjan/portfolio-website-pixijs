import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CanvasService {
  private loadingProgressSource = new BehaviorSubject<number>(null);
  private loadingEndedSource = new BehaviorSubject<boolean>(null);
  private triggerLinkHoverSource = new BehaviorSubject<string>(null);
  private updateCanvasSource = new BehaviorSubject<boolean>(null);
  private switchToHomeSource = new BehaviorSubject<boolean>(null);
  private switchToAboutSource = new BehaviorSubject<boolean>(null);
  private switchToAllProjectsSource = new BehaviorSubject<boolean>(null);
  private switchToProjectSource = new BehaviorSubject<boolean>(null);
  private changeProjectSource = new BehaviorSubject<any>({ currentProjectIndex: null, nextProjectIndex: null });
  private changeProjectWithoutAnimationSource = new BehaviorSubject<any>({ currentProjectIndex: null, nextProjectIndex: null });
  private allProjectHoverSource = new BehaviorSubject<number>(null);
  private allProjectClickSource = new BehaviorSubject<number>(null);
  private clickedOnImageSource = new BehaviorSubject<boolean>(null);
  private toggleMainCanvasSource = new BehaviorSubject<string>(null);
  private toggleNextProjectCanvasSource = new BehaviorSubject<string>(null);
  private clickOnNextProjectSource = new BehaviorSubject<boolean>(null);
  private currentProjectIndexSource = new BehaviorSubject<number>(0);

  public triggerLinkHover$ = this.triggerLinkHoverSource.asObservable();
  public loadingProgress$ = this.loadingProgressSource.asObservable();
  public loadingEnded$ = this.loadingEndedSource.asObservable();
  public updateCanvas$ = this.updateCanvasSource.asObservable();
  public switchToHome$ = this.switchToHomeSource.asObservable();
  public switchToAbout$ = this.switchToAboutSource.asObservable();
  public switchToAllProjects$ = this.switchToAllProjectsSource.asObservable();
  public switchToProject$ = this.switchToProjectSource.asObservable();
  public changeProject$ = this.changeProjectSource.asObservable();
  public changeProjectWithoutAnimation$ = this.changeProjectWithoutAnimationSource.asObservable();
  public allProjectHover$ = this.allProjectHoverSource.asObservable();
  public allProjectClick$ = this.allProjectClickSource.asObservable();
  public clickedOnImage$ = this.clickedOnImageSource.asObservable();
  public toggleMainCanvas$ = this.toggleMainCanvasSource.asObservable();
  public toggleNextProjectCanvas$ = this.toggleNextProjectCanvasSource.asObservable();
  public clickOnNextProject$ = this.clickOnNextProjectSource.asObservable();
  public currentProjectIndex$ = this.currentProjectIndexSource.asObservable();

  triggerLinkHover(state: string) {
    this.triggerLinkHoverSource.next(state);
  }

  loadingProgress(progress: number) {
    this.loadingProgressSource.next(progress);
  }

  loadingEnded(a: boolean) {
    this.loadingEndedSource.next(a);
  }

  updateCanvas(a: boolean) {
    this.updateCanvasSource.next(a);
  }

  switchToHome(a: boolean) {
    this.switchToHomeSource.next(a);
  }

  switchToAbout(a: boolean) {
    this.switchToAboutSource.next(a);
  }

  switchToProject(a: boolean) {
    this.switchToProjectSource.next(a);
  }

  switchToAllProjects(a: boolean) {
    this.switchToAllProjectsSource.next(a);
  }

  changeProject(currentProjectIndex: number, nextProjectIndex: number) {
    this.changeProjectSource.next({ currentProjectIndex: currentProjectIndex, nextProjectIndex: nextProjectIndex });
    return true;
  }

  changeProjectWithoutAnimation(currentProjectIndex: number, nextProjectIndex: number) {
    this.changeProjectWithoutAnimationSource.next({ currentProjectIndex: currentProjectIndex, nextProjectIndex: nextProjectIndex });
    return true;
  }

  allProjectHover(index: number) {
    this.allProjectHoverSource.next(index);
  }

  allProjectClick(index: number) {
    this.allProjectClickSource.next(index);
  }

  clickedOnImage(a: boolean) {
    this.clickedOnImageSource.next(a);
  }

  toggleMainCanvas(state: string) {
    this.toggleMainCanvasSource.next(state);
  }

  toggleNextProjectCanvas(state: string) {
    this.toggleNextProjectCanvasSource.next(state);
  }

  clickOnNextProject(a: boolean) {
    this.clickOnNextProjectSource.next(a);
  }

  currentProjectIndex(index: number) {
    this.currentProjectIndexSource.next(index);
  }
}