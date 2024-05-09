import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { switchMap } from 'rxjs';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heros.service';
import { CoonfirmDialogComponent } from '../../components/coonfirm-dialog/coonfirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });


  public publishers = [
    { id:'DC Comics' , desc:'DC - Comics'},
    { id:'Marvel Comics' , desc:'Marvel - Comics'}
  ]

  constructor(
    private heroesServive:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ){}

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero
  }

  ngOnInit(): void {
      if(!this.router.url.includes('edit')) return

      this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.heroesServive.getHeroById(id)),
      ).subscribe( hero=>{

          if(!hero) return this.router.navigateByUrl('/');
          this.heroForm.reset(hero);
          return;

      })
  }

  onSubmit():void{
    if(this.heroForm.invalid) return;

   if(this.currentHero.id){
    this.heroesServive.updateHero(this.currentHero)
    .subscribe(hero=> {
        this.showSnackbar(`${hero.superhero} Updated`)
      });
      return;
   }

   this.heroesServive.addHero( this.currentHero )
   .subscribe( hero=>{
    this.router.navigate(['/heroes/edit' , hero.id])
    this.showSnackbar(`${hero.superhero} Created`)
   }

   )

  }

  onDeletegHero(){
    if(!this.currentHero.id) throw Error('Hero id is required')

      const dialogRef = this.dialog.open( CoonfirmDialogComponent,{
        data:this.heroForm.value
      })

      dialogRef.afterClosed().subscribe(result=>{
        if(!result) result;
        this.heroesServive.deleteHero(this.currentHero.id).subscribe( wasDeleted => {
          if(wasDeleted) this.router.navigate(['/heroes'])
        })

      })
  }

  showSnackbar(message:string):void{
      this.snackbar.open(message,'done',{
        duration:2400
      })
  }

}
