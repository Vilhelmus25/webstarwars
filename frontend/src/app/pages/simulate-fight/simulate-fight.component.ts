import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulate-fight',
  templateUrl: './simulate-fight.component.html',
  styleUrls: ['./simulate-fight.component.scss']
})
export class SimulateFightComponent implements OnInit {

  @Input() selectedCharacterNameAndSideArray: String = "asd";
  constructor() { }

  ngOnInit(): void {

  }

}
