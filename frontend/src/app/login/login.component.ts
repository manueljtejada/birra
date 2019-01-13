import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  state = {
    login: true,
    register: false,
  };

  constructor(public auth: LoginService, public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  toggleLoginRegister() {
    this.state.login = !this.state.login;
    this.state.register = !this.state.register;
  }

  tryLogin(value) {
    this.auth.doLogin(value)
      .then(res => {
        console.log(res);
        this.dialogRef.close();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

  tryRegister(value) {
    this.auth.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';

        this.toggleLoginRegister();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

}
