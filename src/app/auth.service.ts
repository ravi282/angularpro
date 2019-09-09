import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LOGINURL: string = '/request';
  BASEURL: string = environment.BASEURL;
  constructor(private dataService: DataService,private http:HttpClient) { }
  login(userForm) {
    return this.http.post(this.BASEURL,userForm)
  }
}
