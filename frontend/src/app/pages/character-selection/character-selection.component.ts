import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Characters } from 'src/app/models/characters';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CharactersService } from 'src/app/services/characters.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import SwiperCore, { Swiper } from 'swiper';

SwiperCore.use([]);

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss']
})
export class CharacterSelectionComponent extends LoginComponent implements OnInit {

  currentUser$: User = this.auth.getUser();
  characterList$: Observable<Characters[]> = this.characterService.getAll();
  // currentUser$: Observable<User> = this.userService.get(this.user._id.toString());

  constructor(
    public userService: UserService,
    public config: ConfigService,
    public characterService: CharactersService,
    public router: Router,
    public auth: AuthService,
  ) {
    super(config, auth, router);

  }

  swiper: Swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 100,
  });

  ngOnInit(): void {
  }

  onLogout(): void {
    this.auth.logout();
  }

  onSimulate(): void {
    this.router.navigate(['/duel']);
  }

  onSwipeNext() {
    this.swiper.slideNext(100);
  }
  onSwipePrev() {
    this.swiper.slidePrev(100);
  }

}
