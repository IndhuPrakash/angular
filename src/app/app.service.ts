import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class AppService {
    constructor(private http: HttpClient) {

    }
    host = 'http://localhost:3000';

    /*getPosts() {
        return this.http.get(this.host + '/posts');
    }*/
    getPosts():Observable<any>{
        return this.http.get(`${this.host}/posts`).pipe(map(res=>res));
    }
       /** POST: add a new hero to the database */
 
    
}
