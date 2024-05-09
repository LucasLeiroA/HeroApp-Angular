import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heros.service';
import { ActivatedRoute } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;

  constructor(private heroesSerice:HeroesService,
    private activateRoute:ActivatedRoute,
    private router:Router
  ){}


  ngOnInit(): void {
    this.activateRoute.params.pipe(
      delay(1000),
      switchMap(({id})=> this.heroesSerice.getHeroById(id))
    ).subscribe( hero => {
      if(!hero) return this.router.navigate([ '/heroes/list' ])

      this.hero = hero
      console.log(hero);
      return;
    } );
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }

}
