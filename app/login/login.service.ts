import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn = false;
  list=true;
  login(): Observable<boolean> {
    return of(true).pipe(
      tap(() => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  show(){
    this.list=false;
  }
}