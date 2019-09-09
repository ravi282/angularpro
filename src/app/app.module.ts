import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule,  MatIconModule, MatTableModule, MatProgressBar, MatProgressBarModule, MatSnackBarModule, MatDialogModule, MatExpansionModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
//import { MatSpinner } from "@angular/material";
import { DataService } from './data.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { LandingscreenComponent } from './landingscreen/landingscreen.component';
//import { ConfirmationComponent } from '../../utils/confirmation/confirmation.component';
//import { ToasterComponent } from '../../utils/toaster/toaster.component';
//import { UtilService } from 'utils/services/util.service';
import { AuthGuard } from 'auth.guard';
import { AuthUtilService } from './services/auth-util.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInterceptor } from './appInterceptor';

import { StaticModule} from './static/static.module';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { MainScreenComponent } from './main-screen/main-screen/main-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    LandingscreenComponent,
    MainScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,StaticModule,
    LandingPageModule,
    MatExpansionModule
    
  ],
  providers: [ DataService,AuthService,AuthGuard,AuthUtilService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

