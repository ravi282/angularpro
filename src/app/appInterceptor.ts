import { Injectable } from '@angular/core';
import
{
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor
{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        //request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        request = request.clone({
            withCredentials: true,
        });
        //request = request.clone({ headers: request.headers.set("Access-Control-Allow-Credentials", "true") });
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) =>
            {
                return throwError(error);
            })
        );
    }

}