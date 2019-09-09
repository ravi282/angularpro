
import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly BASEURL = environment.BASEURL;
  readonly LOGINURL = 'request';
  readonly LOGOUT ='logout'

  constructor(private dataService: DataService) { }

  login(loginDetails) {
    return this.dataService.post(loginDetails);
  }

  logout(){
    return this.dataService.get(this.BASEURL + this.LOGOUT)
  }
}
