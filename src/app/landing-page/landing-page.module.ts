
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MatToolbar, MatToolbarModule, MatGridListModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatExpansionModule, MatAccordion, MatTableModule, MatTableDataSource, MatRadioButton, MatRadioModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LandingService } from './landing.service';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    
    
   LandingPageComponent
    
  ],
  imports: [
    BrowserModule,
    MatRippleModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCheckboxModule,
      MatButtonModule,
      MatFormFieldModule,
      MatSelectModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
    MatExpansionModule,
    HttpClientModule
    ],
  providers: [LandingService],
  bootstrap: [AppComponent]
})
export class LandingPageModule { }

