// import { LandingScreenComponent } from './landing-screen/landing-screen.component';
// import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
//   {
//     path:'',component:LoginComponent
//   },
//   {
//     path:'landingScreen',component:LandingScreenComponent
//   },
//   {
//     path:'result',component: ResultComponent
//   }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
