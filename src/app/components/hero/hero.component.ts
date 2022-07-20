import { Component, Input, OnInit } from '@angular/core';
import { ICharData, ICharShortResult } from 'src/app/resources/interfaces/character.interface';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  @Input() hero!: ICharShortResult;

  constructor() { }

  ngOnInit() {
    console.log(this.hero);
  }

}
