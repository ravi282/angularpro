import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingscreenComponent } from './landingscreen/landingscreen.component';
import { StaticComponent } from './static/static/static.component';
import { AuthGuard } from 'auth.guard';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { MainScreenComponent } from './main-screen/main-screen/main-screen.component';


const routes: Routes = [ 
  {
  path: '',
  component: AuthComponent,
},
{
  path:'request',
  component:MainScreenComponent
  // loadChildren: './landing-page/landing-page.module#LandingPageModule',
  
  
}];

// {
//   path: 'analyser',
//   loadChildren: './analyser/analyser.module#AnalyserModule',
//   canActivate: [AuthGuard]
// },


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
