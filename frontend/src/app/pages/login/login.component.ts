import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onLogin(): void {
    this.auth.login(this.user).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/']);        // a főoldalra navigál, ha van user
        }
        // error handling here:

      }
    )
  }
}
