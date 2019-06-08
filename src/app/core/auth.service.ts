import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { User } from './user';

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  doGoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  signOut(){
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    })
  }

  private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserDate(credential.user);
    })
  }

  private updateUserDate(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      roles: {
        user: true
      }
    };
    return userRef.set(data, {merge: true});
  }

  canRead(user: User): boolean{
    const allowed = ['admin', 'user'];
    return this.checkAuth(user, allowed);
  }

  canEdit(user: User): boolean{
    const allowed = ['admin'];
    return this.checkAuth(user, allowed);
  }

  private checkAuth(user: User, allowedRoles: string[]): boolean {
    if(!user) return false;
    for(let role of allowedRoles){
      if(user.roles[role]){
        return true;
      }
    }
    return false;
  }
}
