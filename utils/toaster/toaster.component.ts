import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private snackBar: MatSnackBar) {
  }
  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
