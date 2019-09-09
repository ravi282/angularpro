import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { observable} from 'rxjs';
import { UtilService } from 'utils/services/util.service';
import { AuthUtilService } from 'utils/services/auth-util.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email_id: new FormControl('', [Validators.required, Validators.minLength(8), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  isLoginProcess = false;

  constructor(private dataservice: DataService,
     public utilService: UtilService,
     private router:Router,
     public authUtil: AuthUtilService) { }

  ngOnInit() {
  }
  login()
  {
    this.isLoginProcess = true;
    this.dataservice.getinputs().subscribe(
      (response) =>
      {
        console.log(response);
        
      this.isLoginProcess = false;
      let user = this.utilService.cleanseResponse(response);
      this.router.navigate(['request']);

      });
  }
  
  get email_id() { return this.loginForm.get('email_id'); };
  get password() { return this.loginForm.get('password'); };

}
