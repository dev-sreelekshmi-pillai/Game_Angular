import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {

 

  constructor(private router:Router){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSubmit(form: any) {
    this.router.navigate(['search',form.value.search])
  }

}
