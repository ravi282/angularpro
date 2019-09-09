import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from './utils/services/util.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private utilService: UtilService) { }
    canActivate(): boolean {
        if (!this.utilService.isLoggedIn()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}