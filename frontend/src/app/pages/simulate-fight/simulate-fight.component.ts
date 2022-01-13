import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Characters } from 'src/app/models/characters';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CharactersService } from 'src/app/services/characters.service';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-simulate-fight',
  templateUrl: './simulate-fight.component.html',
  styleUrls: ['./simulate-fight.component.scss']
})
export class SimulateFightComponent extends LoginComponent implements OnInit {

  currentUser$: User = this.auth.getUser();
  characterList$: Observable<Characters[]> = this.characterService.getAll();
  characterList: Characters[] = [];
  opponents!: string[];
  leftBarSize$: string = "10vw";
  rightBarSize$: string = "20vw";
  leftPercent: number = 100;
  rightPercent: number = 100;
  loser: String = "";
  observable: Observable<string> | any;

  constructor(public userService: UserService,
    public config: ConfigService,
    public characterService: CharactersService,
    public router: Router,
    public auth: AuthService,
    private data: DataService,
    //private renderer: Renderer2,
  ) {
    super(config, auth, router);
    this.characterList$.subscribe(itemList => {
      this.characterList = itemList;
      //console.log(this.characterList);
    });
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.opponents = message)
    console.log(this.opponents[2]);
    setTimeout(() => this.fightSimulator(this.leftBarSize$, this.rightBarSize$), 1000);
  }

  fightSimulator(leftBarSize: string, rightBarSize: string): String {
    let victorSide: String = "";
    let currentLeftBarSizeInNumber: number = 30;
    let currentRightBarSizeInNumber: number = 30;

    this.observable = setInterval(() => {
      currentLeftBarSizeInNumber = parseInt(leftBarSize.slice(0, leftBarSize.search('vw')));
      console.log(currentLeftBarSizeInNumber);
      currentRightBarSizeInNumber = parseInt(rightBarSize.slice(0, rightBarSize.search('vw')));
      if (currentLeftBarSizeInNumber <= 0 || currentRightBarSizeInNumber <= 0) {
        if (currentLeftBarSizeInNumber <= 0) {
          victorSide = "left";
        }
        if (currentRightBarSizeInNumber <= 0) {
          victorSide = "right";
        }
        this.loser = victorSide;
      } else {
        currentLeftBarSizeInNumber = currentLeftBarSizeInNumber - (Math.round(1 + Math.random() * 5) - 1);
        currentRightBarSizeInNumber = currentRightBarSizeInNumber - (Math.round(1 + Math.random() * 5) - 1);
        leftBarSize = currentLeftBarSizeInNumber.toLocaleString().concat("vw");

        rightBarSize = currentRightBarSizeInNumber.toString().concat("vw");
        console.log(leftBarSize);
        console.log(rightBarSize);
      }
      console.log(this.loser);
      if (this.loser != "") {
        clearInterval(this.observable);
      }
    }, 1000);


    return victorSide;
  }
}
