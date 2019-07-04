import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import { User } from "src/app/core/user";

@Component({
  selector: "app-user-block",
  templateUrl: "./user-block.component.html",
  styleUrls: ["./user-block.component.scss"]
})
export class UserBlockComponent implements OnInit {
  user: User;

  constructor(public auth: AuthService) {
    
  }

  ngOnInit() {
    this.auth.user.subscribe(data => {
      this.user = data;
    });
  }
}
