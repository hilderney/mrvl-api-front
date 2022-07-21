import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { logout } from 'src/app/pages/login/login.actions';
import { AppState } from 'src/app/reducers';
import { IUser } from 'src/app/resources/interfaces/user.interface';
import { AuthenticationService } from 'src/app/resources/services/authentication.service';

@Component({
  selector: 'app-mrvl',
  templateUrl: './mrvl.component.html',
  styleUrls: ['./mrvl.component.scss']
})
export class MrvlComponent implements OnInit {

  public userData!: IUser;
  private destroy$ = new Subject();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

  }

  logOut() {
    this.store.dispatch(logout());
  }

}
