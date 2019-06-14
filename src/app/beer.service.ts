import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference, AngularFirestoreDocument  } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { map, mergeMap, flatMap, tap, mergeAll } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  beerList: Observable<Category[]>;

  constructor(
    private afs: AngularFirestore
  ) {}

  getCategories(): Observable<DocumentChangeAction<Category>[]> {
    return this.afs.collection<Category>('beerlist').snapshotChanges();
  }

  getCategoryById(id: string): AngularFirestoreDocument{
    return this.afs.doc(`beerlist/${id}`);
  }

  getBeerList(){
    return this.getCategories();
  }

  addBeer(categoryId: string, beer: Beer): Promise<any>{
    return this.afs.collection('beerlist').doc(categoryId).update({
      beers: firestore.FieldValue.arrayUnion(beer)
    })
  }

  updateBeerChecked(categoryId: string, beers: Beer[]) {
    return this.afs.collection('beerlist').doc(categoryId).update({
      beers:beers
    })
  }

  deleteBeer(categoryId: string, beer:Beer) {
    return this.afs.collection('beerlist').doc(categoryId).update({
      beers: firestore.FieldValue.arrayRemove(beer)
    })
  }

}

export interface Category{
  catId?: string;
  cat: string;
  beers?: Beer[];
};

export interface Beer{
  id?: string;
  brand: string;
  name: string;
  perc: string;
  checked: string[];
  rating: number
};