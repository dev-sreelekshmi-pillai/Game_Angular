import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from '../../model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {

  public sort: string = '';
  public games: Array<Game> = [];
  private routeSub: Subscription | undefined;
  private gamesSub: Subscription | undefined;

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.routeSub=this.route.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacritic', params['game-search']);
      } else {
        this.searchGames('metacritic')
      }
    })
  }

  searchGames(sort: string, search?: string) {
    this.gamesSub=this.httpService.getGameList(sort, search).subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList)
    })
  }

  openGameDetails(gameId: number) {
    this.router.navigate(['details', gameId])
  }

  ngOnDestroy(){
    if(this.gamesSub){
      this.gamesSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}
