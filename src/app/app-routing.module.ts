import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn, CanMatchFn } from '@angular/router';
import { Error404pageComponent } from './shared/pages/error404page/error404page.component';
// import { AuthGuardMatch , AuthGuardActivate} from './auth/guards/auth.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';



const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then( m => m.AuthModule),
    canActivate:[PublicGuard],
    canMatch:[PublicGuard]
  },
  {
    path:'heroes',
    loadChildren:()=>import('./heroes/heroes.module').then( m => m.HeroesModule),
    canActivate:[AuthGuard],
    canMatch:[AuthGuard]
  },
  {
    path:'404',
    component:Error404pageComponent
  },
  {
    path:'',
    redirectTo:"heroes",
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
