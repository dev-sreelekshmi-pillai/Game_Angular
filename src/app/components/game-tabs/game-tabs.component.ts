import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Game } from '../../model';
import { CommonModule } from '@angular/common';

MatIconModule

@Component({
  selector: 'app-game-tabs',
  standalone: true,
  imports: [MatTabsModule,MatIconModule,CommonModule],
  templateUrl: './game-tabs.component.html',
  styleUrl: './game-tabs.component.css'
})
export class GameTabsComponent implements OnInit{

  @Input() game!:Game
  constructor(){

  }
  ngOnInit(): void {
    console.log(this.game)
  }
}
