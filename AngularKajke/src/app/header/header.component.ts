import { UserService } from '../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  status: boolean;
  userName: string;
  subscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // pobieramy subskrypcje elementu userService ktora komunikue nam czy jestesmy zalagowani
    // od tego zalezy nasz stan gornego navbara
    this.subscription = this.userService.authNavStatus$.subscribe(status => {
      this.status = status;
      this.userName = this.userService.getUserName();
    });
  }

  /**
   * Wyloguj uzytkownika
   */
  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    // by nie bylo wycieku pamieci
    this.subscription.unsubscribe();
  }
}
