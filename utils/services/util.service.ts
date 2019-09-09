import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { ToasterComponent } from '../toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private confirmationRef: MatDialogRef<ConfirmationComponent>;
  private readonly spinnerColor = 'warn';
  private readonly spinnerValue = '50';
  private readonly spinnerMode  = 'indeterminate';
  private readonly spinnerBufferValue = '75';

  constructor(private toaster: MatSnackBar, private dialog: MatDialog) { }

  openToaster(data) {
    this.toaster.openFromComponent(ToasterComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000,
      data: { message: data.message },
      panelClass: this.getPanelClass(data.messageType)
    })
  }

  closeToaster() {
    this.toaster.dismiss();
  }

  openConfirmation(data) {
    this.confirmationRef = this.dialog.open(ConfirmationComponent, {
      width: '30%',
      autoFocus: false,
      data: { title: data.title, message: data.message, note: data.note ? data.note : null }
    });
    return this.confirmationRef;
  }

  closeConfirmation() {
    this.confirmationRef.close();
  }

  private getPanelClass(messageType): string {
    let returnValue = 'tpanel-info';
    switch (messageType) {
      case 'SUCCESS': {
        returnValue = 'tpanel-success';
        break;
      }
      case 'ERROR': {
        returnValue = 'tpanel-error';
        break;
      }
      case 'WARNING': {
        returnValue = 'tpanel-warning';
        break;
      }
    }
    return returnValue;
  }

  cleanseResponse(response, successFlag?) {
    let returnValue = null;
    const status = response['status'];
    switch (response['status']) {
      case 'SUCCESS': {
        if (successFlag) {
          this.openToaster({ message: response['message'], messageType: status });
        }
        returnValue = response['data'];
        break;
      }
      case 'WARNING': {
        this.openToaster({ message: response['message'], messageType: status });
        break;
      }
      case 'ERROR': {
        this.openToaster({ message: response['message'], messageType: status });
        break;
      }
      default: {
        this.openToaster({ message: 'Something went wrong', messageType: 'ERROR' });
      }
    }
    return returnValue;
  }

  saveItem(key, value){
    sessionStorage.setItem(key, value);
  }

  getItem(key){
    return sessionStorage.getItem(key);
  }

  removeItem(key){
    sessionStorage.removeItem(key);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')?true:false;
  }
}
