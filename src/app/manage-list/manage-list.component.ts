import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBeerDialog } from '../dialogs/add-beer-dialog/add-beer-dialog.component';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {

  beerList: any[] = [];
  searchInput: string;

  constructor(
    private beerService: BeerService,
    private dialog: MatDialog
  ) { }

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

  addBeer(): void{
    let dialogRef = this.dialog.open(AddBeerDialog, {
      // panelClass: 'full-screen-dialog',
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(res => {

    })
  }

  deleteBeer(beer) {
    console.log(beer);
  }

}
