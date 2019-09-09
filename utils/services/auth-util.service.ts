import { Injectable } from '@angular/core';

const messages = {
  required: '  is required',
  minlength: 'Min length should be greater than 7',
  email:'Invalid email'
}

@Injectable({
  providedIn: 'root'
})
export class AuthUtilService {

  constructor() { }

  getRequiredError(field){
    return field + messages.required;
  }

  getMinlengthError(){
    return messages.minlength;
  }

  getEmailError(){
    return messages.email;
  }

}
