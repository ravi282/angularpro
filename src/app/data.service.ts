import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  LOGINURL: string = '/request';
  BASEURL: string = environment.BASEURL;
  readonly pivottablefiltersinput = '/request';
  constructor(private http:HttpClient) { }
  get(url) {
    return this.http.get(url);
  }

  getinputs() {
    return this.http.get(this.BASEURL+this.pivottablefiltersinput);
  }

  post(resource) {
    return this.http.post(this.BASEURL, resource);
  }

  put(url, resource) {
    return this.http.put(url, resource);
  }

  patch(url, resource) {
    return this.http.patch(url, resource);
  }

  delete(url, id, headersJson?: any) {
    return this.http.delete(url + id, headersJson);
  }
}
