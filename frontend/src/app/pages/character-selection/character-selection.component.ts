import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Characters } from 'src/app/models/characters';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CharactersService } from 'src/app/services/characters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss']
})
export class CharacterSelectionComponent implements OnInit {

  user: User = new User();
  characterList$: Observable<Characters[]> = this.characterService.getAll();
  currentUser$: Observable<User> = this.userService.get(this.user._id.toString());

  constructor(
    private userService: UserService,
    private characterService: CharactersService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.auth.logout();
  }

}
