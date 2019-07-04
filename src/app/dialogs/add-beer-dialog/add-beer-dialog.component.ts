import { Component, OnInit, KeyValueDiffers } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BeerService, Beer, Category } from 'src/app/beer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-beer-dialog',
  templateUrl: './add-beer-dialog.component.html',
  styleUrls: ['./add-beer-dialog.component.scss']
})
export class AddBeerDialog implements OnInit {

  beerList: Category[] = [];
  addBeerForm: FormGroup;
  loading: boolean;

  constructor(
    public dialog: MatDialogRef<AddBeerDialog>,
    private beerService: BeerService,
    private snackbar: MatSnackBar
  ) { 
    this.beerService.getCategories().subscribe(data => {
      this.beerList = data
      .map(item => {
        return {
          catId: item.payload.doc.id,
          cat: item.payload.doc.data()['cat']
        }
      })
      .sort((a, b) => ( a.cat > b.cat ? 1 : -1));
    });
  }

  ngOnInit() {
    this.addBeerForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      name: new FormControl('', []),
      percentage: new FormControl('', [Validators.required])
    });
  }

  addBeer(form) {
    this.addBeerForm.disable();
    const category = form.category;
    const beer: Beer = {
      brand: form.brand,
      name: form.name,
      perc: form.percentage.toString(),
      checked: [],
      rating: null
    };

    this.beerService.addBeer(category, beer).then(res => {
      this.close(true);
    }, err => {
      this.addBeerForm.disable();
      
    });
  }

  showSnackbar(message: string){
    this.snackbar.open(message, 'Sluit', {
      duration: 1500,
      verticalPosition: 'bottom'
    })
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.addBeerForm.controls[controlName].hasError(errorName);
  }

  close(res: boolean) {
    this.dialog.close(res);
  }

}
