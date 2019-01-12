import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth: AngularFireAuth) { }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}
