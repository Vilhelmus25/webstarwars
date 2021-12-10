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
  leftPercent: number = 100;
  rightPercent: number = 100;

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

  }

}
