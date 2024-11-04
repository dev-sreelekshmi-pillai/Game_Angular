import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/envronment';
import { APIResponse, Game } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor( private http:HttpClient) { }

  getGameList(ordering:string,search?:string):Observable<APIResponse<Game>>
  {
    let params=new HttpParams().set('ordering',ordering)
    if(search){
      params=new HttpParams().set('ordering',ordering).set('search',search)
    }
    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`,{params:params})
    
  }

  getGameDetails(id:string):Observable<Game>{
    const gameInfoRequest=this.http.get(`${environment.BASE_URL}/games/${id}`)
    const gameTrailersRequests=this.http.get(`${environment.BASE_URL}/games/${id}/movies`)
    const gameScreenshotRequests=this.http.get(`${environment.BASE_URL}/games/${id}/screenshots`
    )
    return forkJoin({
      gameInfoRequest,gameScreenshotRequests,gameTrailersRequests
    }).pipe(
      map((resp:any)=>{
        return {...resp['gameInfoRequest'],
        screenshots: resp['gameScreenshotRequests']?.results,
          trailers:resp['gameTrailersRequests']?.results
        }
      })
    )
  }
}
