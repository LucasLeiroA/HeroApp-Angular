import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heros.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  public searchInput = new FormControl('');

  public heroes:Hero[]=[];
  public selectedHero?:Hero;

  constructor(private heroesService:HeroesService){}

  searchHero(){

    const value:string = this.searchInput.value || "";
    console.log(value);

    this.heroesService.getSuggestion(value)
    .subscribe(heroes => this.heroes = heroes)

  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void{
    if (!event.option.value) {
      this.selectedHero === undefined;
      return;
    }

    const hero:Hero = event.option.value;
    this.searchInput.setValue(hero.superhero)

    this.selectedHero = hero;
  }



}
