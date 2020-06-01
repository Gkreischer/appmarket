import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("token");

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    idToken)
            });

            cloned.headers.append("Access-Control-Allow-Origin", '*');

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}

