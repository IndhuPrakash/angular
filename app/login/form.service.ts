import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {userdetails} from './user';
import { studentdetails } from '../student/student';

@Injectable()
export class FormService {
    constructor(private http: HttpClient) {

    }
    host = 'http://localhost:3000';

    postStudent(data:studentdetails):Observable<any>{
        return this.http.post<userdetails>(`${this.host}/student`,data)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    getStudent():Observable<any>{
        return this.http.get<userdetails>(`${this.host}/student`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );       
    }
    delStudent(studentid:number){        
        return this.http.delete<userdetails>(`${this.host}/student/${studentid}`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    editStudent(data:studentdetails):Observable<any>{
        return this.http.put(`${this.host}/student/${data.id}`,data)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    filterStudent(value:string):Observable<any>{
        return this.http.get<studentdetails>(`${this.host}/student?${value}`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );  
    }
    getDetails():Observable<any>{
        return this.http.get<userdetails>(`${this.host}/user`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    getAdminDetails():Observable<any>{
        return this.http.get<userdetails>(`${this.host}/admin`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    getDetailsWithParams(id,useroradmin:string):Observable<any>{
        let params1=new HttpParams().set('id',id)
        let path:string;
        if(useroradmin=='admin')
            path='admin';
        else
            path='user'
        return this.http.get<userdetails>(`${this.host}/${path}`,{params:params1})
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    postDetails(data:userdetails):Observable<userdetails>{
        return this.http.post<userdetails>(`${this.host}/user`,data)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    delDetails(userid:number){
        return this.http.delete<userdetails>(`${this.host}/user/${userid}`)        
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    editDetails(data:userdetails):Observable<any>{
        return this.http.patch(`${this.host}/user/${data.id}`,data)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(
          'Something bad happened; please try again later.');
      }    
}
