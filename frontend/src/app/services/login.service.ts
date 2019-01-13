import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable, Subscriber, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = afAuth.authState;
  }

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

  doLogout() {
    return of(this.afAuth.auth.signOut());
  }

  getUser(): Observable<any> {
    return this.user;
  }
}
