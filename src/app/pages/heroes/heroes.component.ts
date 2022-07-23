import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { LocalStorageNames } from 'src/app/resources/consts/localstorage-names.const';
import { InitialPaginationValues } from 'src/app/resources/consts/pagination.const';
import { ICharShortResult, IpaginationResult, IPaginationView } from 'src/app/resources/interfaces/character.interface';
import { CharacterService } from 'src/app/resources/services/character.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  paginationResult$!: Observable<IpaginationResult<ICharShortResult[]>>;
  heroes$!: Observable<ICharShortResult[]>;
  pagination: IPaginationView = InitialPaginationValues;
  form!: FormGroup;
  paginationSize: number = 10;
  formNames = {
    nameStartsWith: 'nameStartsWith',
    limit: 'limit',
    offset: 'offset',
  }

  constructor(
    private service: CharacterService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.initializeForms())
      this.getLastHeroesListed();
  }

  initializeForms(): boolean {
    const lastSearch = localStorage.getItem(LocalStorageNames.lastSearch);

    this.form = this.formBuilder.group({
      [this.formNames.nameStartsWith]: ['', [Validators.required, Validators.minLength(2)]],
      [this.formNames.limit]: [this.paginationSize, [Validators.required]],
      [this.formNames.offset]: [0, [Validators.required]]
    });

    if (!!lastSearch)
      this.form.patchValue(JSON.parse(lastSearch));

    console.log('lastSearch', lastSearch);
    return !!lastSearch
  }

  getLastHeroesListed() {
    const lastHeroes = localStorage.getItem(LocalStorageNames.heroesListed);

    if (!!lastHeroes) {
      this.heroes$ = of(JSON.parse(lastHeroes).heroes);
      this.pagination = JSON.parse(lastHeroes).pagination;
      console.log('lastHeroes', JSON.parse(lastHeroes).heroes);
      console.log('lastPagination', JSON.parse(lastHeroes).heroes);
    }
  }

  updatePagination(updatedPagination: IPaginationView) {
    this.pagination = updatedPagination;
    this.form.controls[this.formNames.offset].setValue(updatedPagination.offset);
    this.fetchHeroes();
  }

  fetchHeroes() {
    const lastSearch = localStorage.getItem(LocalStorageNames.lastSearch);
    const formTerm = this.form.controls[this.formNames.nameStartsWith].value.trim().toUpperCase();
    this.form.controls[this.formNames.nameStartsWith].setValue(formTerm);

    if (!!lastSearch) {
      if (lastSearch === JSON.stringify(this.form.getRawValue())) {
        console.log('Resultado igual a ultima pesquisa')

        if (JSON.parse(lastSearch).nameStartsWith !== formTerm) {
          this.pagination.offset = 0;
          this.form.controls[this.formNames.offset].setValue(this.pagination.offset);
        }
        return;
      } else {
        this.pagination.page = 1;
      }
    }

    const payload = this.form.getRawValue();

    this.paginationResult$ = this.service.fetchCharacters(this.form.getRawValue());

    this.heroes$ = this.paginationResult$
      .pipe(
        map(response => {
          this.clearHeroesStorage();
          this.updateHeroesLocalStorage(response);
          this.pagination = response.pagination;
          return response.heroes;
        })
      );

  }

  updateHeroesLocalStorage(response: IpaginationResult<ICharShortResult[]>) {
    localStorage.setItem(
      LocalStorageNames.heroesListed,
      JSON.stringify(response)
    );
    localStorage.setItem(
      LocalStorageNames.lastSearch,
      JSON.stringify(this.form.getRawValue())
    );
  }

  clearHeroesStorage() {
    localStorage.removeItem(LocalStorageNames.heroesListed);
    localStorage.removeItem(LocalStorageNames.lastSearch);
  }

}
