import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  constructor(private userService: UserService) {
    // sprawdzenie czy po dluzszym czasie token JWT jest ciaglw wazny
    userService.IsAuthorized();
  }

  ngOnInit() {
  }
}
