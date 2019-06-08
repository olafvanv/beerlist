import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  beerList: Observable<Category[]>;

  constructor(
    private afs: AngularFirestore
  ) {}

  getBeerList(): Observable<DocumentChangeAction<{}>[]> {
    return this.afs.collection<Category>('beerlist').snapshotChanges();
  }

  addBeer(beer, category){
    return this.afs.collection<Category>('beerlist').add(beer)
  }

  updateBeerList(list) {
    return this.afs.collection<Category>('beerlist');
  }

}

export interface Category{
  cat: string;
  beers: Beer[];
};

export interface Beer{
  brand: string;
  name: string;
  perc: string;
  checked: string[];
  rating: number
};