import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Characters } from 'src/app/models/characters';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CharactersService } from 'src/app/services/characters.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { Swiper, SwiperOptions, Navigation, Pagination } from 'swiper';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';


@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss']
})
export class CharacterSelectionComponent extends LoginComponent implements OnInit {

  currentUser$: User = this.auth.getUser();
  characterList$: Observable<Characters[]> = this.characterService.getAll();
  characterList: Characters[] = [];
  // currentUser$: Observable<User> = this.userService.get(this.user._id.toString());
  direction: String = "";
  left: String = "left";
  right: String = "right";
  indexCharacter: number = 0;
  selectedCharacterName: String[] = [];
  alreadySelectedCharacterSide: String[] = [];
  showSimulateButton: boolean = false;

  constructor(
    public userService: UserService,
    public config: ConfigService,
    public characterService: CharactersService,
    public router: Router,
    public auth: AuthService,
    private renderer: Renderer2,
  ) {
    super(config, auth, router);
    this.characterList$.subscribe(itemList => {
      this.characterList = itemList;
      console.log(this.characterList);
    });
  }

  ngOnInit(): void {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      speed: 400,
      spaceBetween: 100,
      pagination: {
        clickable: true,
        el: '.swiper-pagination',
        type: 'bullets',

        // bulletActiveClass: '.swiper-pagination-bullet-active',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    swiper.slideNext();
    swiper.slidePrev();

  }

  onLogout(): void {
    this.auth.logout();
  }

  onSimulate(): void {
    this.router.navigate(['/duel']);
  }

  onSwipeNext() {

    // const swiper = new Swiper('.swiper', {
    //   modules: [Navigation, Pagination],
    //   speed: 400,


    //   pagination: {
    //     clickable: true,
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // });
    // swiper.slideNext();
  }
  onSwipePrev() {
    // const swiper = new Swiper('.swiper', {
    //   modules: [Navigation, Pagination],
    //   speed: 400,

    //   pagination: {
    //     clickable: true,
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // });
    // swiper.slidePrev();
  }

  swipeCharacterPlus(): void {
    this.indexCharacter += 1;
    // console.log(this.indexCharacter);
  }
  swipeCharacterMinus(): void {
    this.indexCharacter = this.indexCharacter - 1;
    // console.log(this.indexCharacter);
  }
  getCharacterSide(side: String): String {
    return side;
  }
  selectCharacter(): void {
    if (this.selectedCharacterName[0] != this.characterList[this.indexCharacter].name) {
      this.selectedCharacterName.push(this.characterList[this.indexCharacter].name);
      this.alreadySelectedCharacterSide.push(this.characterList[this.indexCharacter].side);

    }
    if (this.selectedCharacterName[1] != this.characterList[this.indexCharacter].name) {
      if (this.characterList[this.indexCharacter].side !== this.alreadySelectedCharacterSide[0]) {
        this.selectedCharacterName.push(this.characterList[this.indexCharacter].name);
        this.alreadySelectedCharacterSide.push(this.characterList[this.indexCharacter].side);
      }
    }
  }
  fight(name0: String, name1: String, side0: String, side1: String): void {
    // this.selectedCharacterNameAndSideArray.push(name0, name1, side0, side1);
    // this.selectedCharacterData.emit(this.selectedCharacterNameAndSideArray);

    if (this.alreadySelectedCharacterSide[1] != '') {
      this.router.navigate(['/simulateFight']);
    }
  }
}
