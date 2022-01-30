import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth/firebase';
import { addDoc, collection, doc, docData, DocumentData, DocumentReference, Firestore, getDoc, getDocs, getFirestore, limit, query, serverTimestamp, setDoc, where } from '@angular/fire/firestore';
import { deleteDoc, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { firstValueFrom, from, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { Deck } from '../modals/deck';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DecklistStorageService {

  db: Firestore = getFirestore();

  deckListCollection: string = "deckList/";

  constructor(private auth: AuthenticationService) { }

  addDeckList(deck: Deck): Observable<DocumentReference<DocumentData>> {
    return this.auth.currentUser.pipe(switchMap((user) => {

      deck.owner = user?.uid;

      let toSend: DocumentData = {...deck};
      toSend['created'] = serverTimestamp();

      return from(addDoc(collection(this.db, this.deckListCollection), toSend));
    }))
  }

  retrieveDecklist(id: string): Observable<Deck> {
    const listRef = doc(this.db, this.deckListCollection + id);
    return docData(listRef, {idField: 'id'}).pipe(map((res: Deck) => res as Deck))
  }

  listOwnedDeckLists(): Observable<Array<Deck>> {
    return this.auth.currentUser.pipe(switchMap((user) => {
      const listQuery = query(collection(this.db, this.deckListCollection), where('owner', '==', user?.uid))
      return from(getDocs(listQuery)).pipe(map((res) => res.docs.map(toConvert => this.convert(toConvert))));
    }))
  }

  listPublicDeckLists(): Observable<Array<Deck>> {
    const listQuery = query(collection(this.db, this.deckListCollection), where('public', '==', true))
    return from(getDocs(listQuery)).pipe(map((res) => res.docs.map(toConvert => this.convert(toConvert))));
  }

  deleteDecklist(id: string): Observable<void> {
    const docRef = doc(this.db, this.deckListCollection + id);
    return from(deleteDoc(docRef));
  }

  updateDecklist(deck: Deck): Observable<void> {
    const deckRef = doc(this.db, this.deckListCollection + deck.id);
    return from(setDoc(deckRef, deck))
  }

  private convert(toMap: QueryDocumentSnapshot<DocumentData>): Deck {
    let data: Deck = toMap.data();
    data.id = toMap.id;
    return data;
  }


}
