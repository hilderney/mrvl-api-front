import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ICharShortResult } from 'src/app/resources/interfaces/character.interface';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: 'auto',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.3s 0.15s ease-in')
      ]),
      transition('closed => open', [
        animate('0.3s 0.15s ease-in')
      ]),
      state('down', style({
        transform: 'rotate(-180deg)',
      })),
      state('up', style({
        transform: 'rotate(0deg)',
      })),
      transition('down => up', [
        animate('0.5s 0.15s ease-in')
      ]),
      transition('up => down', [
        animate('0.5s 0.15s ease-in')
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit {

  @Input() hero!: ICharShortResult;
  showFullData: boolean = false;

  constructor() { }

  ngOnInit() {
  }



}
