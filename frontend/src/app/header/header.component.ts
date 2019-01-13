import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user;
  public userLoggedIn: boolean;
  public login;

  constructor(public dialog: MatDialog, public auth: LoginService) { }

  ngOnInit() {
    this.auth.getUser().subscribe(user => this.user = user);
  }

  openLoginDialog() {
    const modalOptions = {
      width: '500px',
      height: '450px',
    };

    this.dialog.open(LoginComponent, modalOptions);
  }

  doLogout() {
    this.auth.doLogout()
      .subscribe();
  }

  @HostListener('window:storage', ['$event']) process() {
    this.auth.getUser().subscribe(login => this.login = login);
  }

}
