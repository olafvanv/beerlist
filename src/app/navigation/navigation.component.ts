import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { User } from '../core/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  user: User;

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
        this.sidenav.close();
    })

    this.auth.user.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  logOut() {
    this.auth.signOut();
    this.router.navigate(['/user']);
  }

}
