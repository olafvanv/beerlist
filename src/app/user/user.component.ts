import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { fadeIn } from '../core/animations/fade-in';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fadeIn]
})
export class UserComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
