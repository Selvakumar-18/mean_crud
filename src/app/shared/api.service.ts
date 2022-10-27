import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) { }

  postIssue(data:any){
      return this.http.post<any>("http://localhost:3000/postissue",data)
      .pipe(map((res:any)=>{
          return res;
      }))
  }

  getIssue(){
    return this.http.get<any>("http://localhost:3000/postissue")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteIssue(id:number){
    return this.http.delete<any>(`http://localhost:3000/postissue/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateIssue(data:any,id:number){
    return this.http.put<any>(`http://localhost:3000/postissue/${id}`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
