import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError as observableThrowError } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req=req.clone({
            // setHeaders:{
            //     'api-key': '11f57b2ba1e448aaae79686294ce4952',
            //     'key-host': 'https://api.rawg.io'
            // },
            setParams:{
                key:'11f57b2ba1e448aaae79686294ce4952'
            }
        })
        return next.handle(req)
    }
}