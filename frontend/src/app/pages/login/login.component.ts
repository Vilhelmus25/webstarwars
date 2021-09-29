import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private config: ConfigService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onLogin(): void {
    this.auth.login(this.user).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/characterSelection']);
        }
      }
    )
  }
}
