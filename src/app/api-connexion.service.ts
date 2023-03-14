import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Groups } from './Interface/IGroups';
import { User } from './Interface/IUsers';

@Injectable({
  providedIn: 'root'
})
export class ApiConnexionService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:8000/api/'; 
  private urlUsers = 'http://127.0.0.1:8000/api/users/'
  private urlGroups = 'http://127.0.0.1:8000/api/groups'; 


  getGroups(): Observable<Groups[]> {
    return this.http.get<Groups[]>(this.urlGroups);
  }
  getGroup(id: number): Observable<Groups[]> {
    return this.http.get<Groups[]>(this.urlGroups + id);
  }
  getAllWithParameter(id: number, parameter: number){
    return this.http.get<Groups[]|User[]>(this.url+ id + '/network/' + parameter);
  }
  getUser(id:number){
    return this.http.get<User[]>(this.urlUsers + id);
  }

}
