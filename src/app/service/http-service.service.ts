import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
@Injectable()
export class HttpServiceService {

  constructor(private http: HttpClient) { }
  httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'})
   };
   get(url: string ) {
      return this.http.get(url);
   }

   post(url: string,datas:object) {

     return this.http.post(url,datas,this.httpOptions);

   }
}
