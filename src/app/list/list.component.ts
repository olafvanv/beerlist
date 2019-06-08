import { Component, OnInit } from '@angular/core';
import { BeerService, Category, Beer } from '../beer.service';
import { AuthService } from '../core/auth.service';
import { User } from '../core/user';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit { 
  beerList: Category[] = [];
  searchInput: string;
  user: User;

  constructor(
    private readonly beerService: BeerService,
    private readonly auth: AuthService
  ) {     
    this.auth.user.subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.beerService.getBeerList().subscribe(data => {
      this.beerList = data.map(item => {
        return {
          cat: item.payload.doc.data()['cat'],
          beers: item.payload.doc.data()['beers']
        }
      });
    });
  }

  isBeerChecked(checkedIds: string[] = []): boolean {
    const checked = checkedIds.filter(id => id === this.user.uid).length;
    return checked > 0;
  }

  checkBeer(ev: MatCheckboxChange, beer: Beer): void{
    const userId = this.user.uid;
    const toggleTo = ev.checked;

    if(toggleTo){
      beer.checked.push(userId);
    }else{
      const i = beer.checked.indexOf(userId, 0);
      if(i >= 0){
        beer.checked.splice(i, 1);
      }
    }

    console.log(beer);
  }
}
