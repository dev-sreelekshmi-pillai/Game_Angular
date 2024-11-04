import { Component, OnDestroy, OnInit } from '@angular/core';
import { GaugeModule } from 'angular-gauge';
import { appConfig } from '../../app.config';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Game } from '../../model';
import { CommonModule } from '@angular/common';
import { GameTabsComponent } from "../game-tabs/game-tabs.component"; 




@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, GaugeModule, GameTabsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  providers:[]
})
export class DetailsComponent implements OnInit,OnDestroy {
gameRating: number=0;
gameId:string='';
routeSub!:Subscription ;
gameSub!: Subscription;
  game: Game = {
    id: 0,
    background_image: '',
    name: '',
    released: '',
    metacritic_url: '',
    website: '',
    description: '',
    metacritic: 0,
    genres: [],
    parent_platforms: [],
    publishers: [],
    ratings: [],
    screenshots: [],
    trailers: []
  } ;

constructor(private activatedRoute:ActivatedRoute, private httpService:HttpService){}
  

ngOnInit(){
  this.routeSub=this.activatedRoute.params.subscribe((params:Params)=>{
    this.gameId=params['id'];
    this.gameDetails(this.gameId)
  })
}

gameDetails(gameId: string){
  this.gameSub=this.httpService.getGameDetails(gameId).subscribe((gameRes:Game)=>{
    this.game=gameRes;
    console.log("game",this.game);
    console.log(this.game.screenshots);
    
    setTimeout(()=>{
      this.gameRating=this.game.metacritic
    },1000)
  })
}

getColor(value:number){
  if(value>75){
    return '#5ee432'
}else if(value>50){
  return '#fffa50'
}else if(value>30){
  return '#f7aa38'
}else {
  return '#ef4655'
}
}


ngOnDestroy(): void {
  if(this.gameSub){
    this.gameSub.unsubscribe();
  }
  if(this.routeSub){
    this.routeSub.unsubscribe();
  }
}
}
