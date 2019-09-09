import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster/toaster.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatButtonModule, MatSnackBarModule, MatDialogModule, MatIconModule, MatDialogActions, MatDialogClose, MatTable } from '@angular/material';
import { UtilService } from './services/util.service';

@NgModule({
  declarations: [ToasterComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatTable
  ],
  entryComponents:[ToasterComponent,  ConfirmationComponent],
  providers:[UtilService,]
})
export class UtilsModule { }
