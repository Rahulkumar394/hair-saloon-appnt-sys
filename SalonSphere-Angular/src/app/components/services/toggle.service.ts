import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private leftMarginSubject = new BehaviorSubject<string>('280px');
  private widthSubject = new BehaviorSubject<string>('82%');
  leftMargin$ = this.leftMarginSubject.asObservable();
  width$ = this.widthSubject.asObservable();

  constructor() { }

  setLeftMargin(margin: string) {
    this.leftMarginSubject.next(margin);
  }
  setWidth(width:string) {
    this.widthSubject.next(width);
  }
}
