import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { ICharShortResult } from 'src/app/resources/interfaces/character.interface';
import { CharacterService } from 'src/app/resources/services/character.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes$: Observable<ICharShortResult[]> = of([]);
  form!: FormGroup;


  constructor(
    private service: CharacterService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nameStartsWith: ['', [Validators.required, Validators.minLength(2)]],
      limit: [100],
      offset: [0],
    });
  }

  fetchHeroes() {
    this.heroes$ = this.service.fetchCharacters(this.form.getRawValue())
      .pipe(
        map(response => {
          return response.results;
        })
      );
  }

}
