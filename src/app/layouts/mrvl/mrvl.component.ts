import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from 'src/app/resources/interfaces/user.interface';
import { AuthenticationService } from 'src/app/resources/services/authentication.service';

@Component({
  selector: 'app-mrvl',
  templateUrl: './mrvl.component.html',
  styleUrls: ['./mrvl.component.scss']
})
export class MrvlComponent implements OnInit, OnDestroy {

  public userData!: IUser;
  private destroy$ = new Subject();

  constructor(
    private authService: AuthenticationService,
  ) {
    this.authService.user
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          console.log(user);
        }
      });
  }

  ngOnInit() {
    console.log('set user logged data');
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  logOut() {
    this.authService.logout();
  }

}
