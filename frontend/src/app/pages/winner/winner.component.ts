import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Characters } from 'src/app/models/characters';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CharactersService } from 'src/app/services/characters.service';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent extends LoginComponent implements OnInit, ConfigService {

  currentUser$: User = this.auth.getUser();
  characterList$: Observable<Characters[]> = this.characterService.getAll();
  characterList: Characters[] = [];
  theWinner!: string[];
  subscription: Subscription = new Subscription;
  message!: string[];
  winner: string = "";


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
    this.data.currentMessage.subscribe(message => this.theWinner = message);
  }

  backToMain() {
    this.router.navigate(['/characterSelection']);
  }

}
