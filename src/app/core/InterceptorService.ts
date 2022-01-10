import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const authToken = sessionStorage.getItem('token');
        httpRequest = httpRequest.clone({
            setHeaders: {
                Authorization: `Basic ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        return next.handle(httpRequest);

    }
}
