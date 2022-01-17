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
import { interval, Subscription } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-simulate-fight',
  templateUrl: './simulate-fight.component.html',
  styleUrls: ['./simulate-fight.component.scss']
})
export class SimulateFightComponent extends LoginComponent implements OnInit, ConfigService {

  currentUser$: User = this.auth.getUser();
  characterList$: Observable<Characters[]> = this.characterService.getAll();
  characterList: Characters[] = [];
  opponents!: string[];
  leftBarSize: number = 30;
  rightBarSize: number = 30;
  leftPercent: number = 100;
  rightPercent: number = 100;
  loser: String = "";
  subscription: Subscription = new Subscription;


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
  public apiUrl: string = "";

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.opponents = message)
    console.log(this.opponents[2]);
    this.fightSimulator(this.leftBarSize, this.rightBarSize);
  }

  fightSimulator(leftBarSize: number, rightBarSize: number): String {

    let victorSide: String = "";
    this.subscription = interval(1000).subscribe(() => {
      let currentLeftBarSizeInNumber: number = leftBarSize;
      let currentRightBarSizeInNumber: number = rightBarSize;

      if (currentLeftBarSizeInNumber <= 0 || currentRightBarSizeInNumber <= 0) {
        if (currentLeftBarSizeInNumber <= 0) {
          currentLeftBarSizeInNumber = 0;
          victorSide = "left";
        }
        if (currentRightBarSizeInNumber <= 0) {
          currentRightBarSizeInNumber = 0;
          victorSide = "right";
        }
        this.loser = victorSide;
        console.log(this.loser);
        if (this.loser != "") {
          // clearInterval(this.subscription);
          this.subscription.unsubscribe();
        }
      } else {
        currentLeftBarSizeInNumber = currentLeftBarSizeInNumber - (Math.round(1 + Math.random() * 5) - 1);
        currentRightBarSizeInNumber = currentRightBarSizeInNumber - (Math.round(1 + Math.random() * 5) - 1);
        leftBarSize = currentLeftBarSizeInNumber;
        rightBarSize = currentRightBarSizeInNumber;
        this.leftBarSize = currentLeftBarSizeInNumber;
        this.rightBarSize = currentRightBarSizeInNumber;
        console.log("Left Side: " + this.leftBarSize);
        console.log("River Side: " + this.rightBarSize);
      }
      console.log("-------------------");
    });
    return victorSide;
  }

}
