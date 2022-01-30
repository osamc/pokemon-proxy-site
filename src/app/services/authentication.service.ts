import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, User, UserCredential } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { from, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User | null = null; 
  
  currentUser = authState(this.auth).pipe(tap((user) => {
      this.user = user;
  }));

  constructor(private auth: Auth) { }

  loginWithEmail(username: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  loginWithGoogle() {
    let provider = new GoogleAuthProvider();
    return from(
      signInWithPopup(this.auth, provider).then(res => {
        console.log(res);
      }));
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  signup(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).
      pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }

}
