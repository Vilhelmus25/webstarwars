import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // értesíteni kell az alkalmazás használóit, hogy be van-e lépve vagy nem
  currentUserSubject$: BehaviorSubject<User | null> =     // ha be van lépve akkor User, ha nincs akkor null-t kapunk vissza
    new BehaviorSubject<User | null>(null);     // kezdésre null, mert alapból nincs senki belépve
  lastToken: string = '';       // az utolsó tárolt token
  loginUrl: string = `${this.config.apiUrl}login`;                  // erre küldi a postot a bejelentkezési címre


  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
  ) {
    if (localStorage.currentUser) {
      const user: User = JSON.parse(localStorage.currentUser);    // van-e belépett felhasználóm a localStorage-ban, így vissza tudom tölteni
      this.lastToken = user.accessToken || '';
      this.currentUserSubject$.next(user);
    }
  }

  // npm install bcryptjs

  login(loginData: User): Observable<User | null> {
    return this.http.post<{ user: User, accessToken: string }>(       // postolunk mert be akarunk jelentkezni, az accesstokent és a usert küld vissza a szerver
      this.loginUrl,   // hova
      loginData       // mit
    ).pipe(           // ez a pipe, azért kell, mert a login típusa, nem egyezik a post típusával
      map(response => {     // mindez ha sikerült belépni
        if (response.user && response.accessToken) {
          this.lastToken = response.accessToken;
          response.user.accessToken = response.accessToken;
          this.currentUserSubject$.next(response.user);   // a feliratkozóknak terítem, tehát akik figyelik az auth service-emet, kapnak értesítést róla, hogy változott currentuserSubject értéke
          localStorage.currentUser = JSON.stringify(response.user);        // a böngésző localeStorage-éba taárolom, a user adatait. Ha frissítem a böngészőt, akkor meg tudom előbb nézni a localeStorage-t és nem kell újra lekérdezni, viszont, ezt majd egyszer törölni is kell.
          return response.user;   // Usert ad vissza
        }
        return null;      // ha nem akkor null-t
      })           // feliratkozik ennek a postnak a kimenetére, egy ilyet fog kapni, (user és access token) és visszaad valami más adatot, vagyis pont a <User | null> típust
    );
  }

  logout(): void {
    this.lastToken = '';                              // mindent nullázunk
    this.currentUserSubject$.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/', 'login']);             // visszairányít a login oldalra
  }
}
