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

  public user: User = new User();

  constructor(
    public config: ConfigService,
    public auth: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }
  onLogin(): void {
    // this.user = new User();
    this.auth.login(this.user).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/characterSelection']);
        }
      }
    )
  }
}
