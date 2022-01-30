import { Injectable } from '@angular/core';
import { Card, CardSearch, Filter, MutliValueProperty, PokemontcgIoService, Set } from 'ngx-pokemontcg-io';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Deck } from '../modals/deck';

@Injectable({
  providedIn: 'root'
})
export class ExportImportService {

  sets: Set[] = [];

  constructor(private io: PokemontcgIoService) { }

  ptcgoParse(importText: string): { [key: string]: number; } {

    let lines = importText.split('\n');
    let list: { [key: string]: number; } = {};

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length > 2) {
        if (lines[i][0] == '*' && lines[i][1] == ' ') {

          let splitOnSpace = lines[i].split(' ');
          let count = splitOnSpace[1];

          //the last two things should be 0: set, 1: set number
          let setAndNumber = splitOnSpace.splice(-2);
          let set = setAndNumber[0];

          if (set != "Energy") {

            let setFound = this.getSetFromPtcgoCode(set);

            if (setFound && setFound.id) {
              list[setFound.id + '-' + setAndNumber[1]] = Number.parseInt(count);
            }
          }
        }
      }
    }

    return list;

  }

  getCardsFromApi(list: { [key: string]: number; }) {
    let multipleProperty = new MutliValueProperty(CardSearch.ID, Object.keys(list));
    let filter = new Filter([multipleProperty]);
    return this.io.searchCards(filter).pipe(map((res) => res.data ?? []));
  }

  private getSetFromPtcgoCode(code: string) {
    for (let i = 0; i < this.sets.length; i++) {
      if (this.sets[i].ptcgoCode === code) {
        return this.sets[i];
      }
    }
    return null;
  }


}
