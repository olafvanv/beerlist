import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BeerService } from 'src/app/beer.service';

@Component({
  selector: 'app-add-beer-dialog',
  templateUrl: './add-beer-dialog.component.html',
  styleUrls: ['./add-beer-dialog.component.scss']
})
export class AddBeerDialog implements OnInit {

  beerList = [];

  constructor(
    public dialog: MatDialogRef<AddBeerDialog>,
    private beerService: BeerService
  ) { 
    this.beerService.getBeerList().subscribe(data => {
      this.beerList = data.map(item => {
        return {
          cat: item.payload.doc.data()['cat']
        }
      });
    });
  }

  ngOnInit() {
    
  }

}
