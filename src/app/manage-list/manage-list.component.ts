import { Component, OnInit } from '@angular/core';
import { BeerService, Beer, Category } from '../beer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBeerDialog } from '../dialogs/add-beer-dialog/add-beer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit{

  beerList: Category[] = [];
  searchInput: string;


  constructor(
    private beerService: BeerService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.beerService.getBeerList().subscribe(data => {
      this.beerList = data.map(item => {
        return {
          catId: item.payload.doc.id,
          cat: item.payload.doc.data()['cat'],
          beers: item.payload.doc.data()['beers']
        }
      });
    });
  }

  addBeer(): void{
    let dialogRef = this.dialog.open(AddBeerDialog, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.showSnackbar('Bier is toegevoegd!');
        console.log(this.beerList);
      }
    })
  }

  deleteBeer(category: Category, beer: Beer) {
    this.beerService.deleteBeer(category.catId, beer);
  }

  showSnackbar(message: string){
    this.snackbar.open(message, 'Sluit', {
      duration: 1500,
      verticalPosition: 'bottom'
    })
  }

}
