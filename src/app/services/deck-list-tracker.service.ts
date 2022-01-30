import { Injectable } from '@angular/core';
import { list } from '@angular/fire/database';
import { Card } from 'ngx-pokemontcg-io';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckListTrackerService {

  deckUpdated: Subject<void> = new Subject<void>();

  deck: { [key: string]: number; } = {};
  cardMap: Map<string, Card> = new Map<string, Card>();

  count: number = 0;

  constructor() { }

  addCard(card: Card) {
    if (card.id) {
      let count = this.deck[card.id] ?? 0;
      count++;
      this.deck[card.id] =  count;
      this.cardMap.set(card.id, card);
      this.updateCount();
    }
   
  }

  removeCard(card: Card) {
    if (card.id) {
      let count = this.deck[card.id] ?? 0;
      if (count != 0) {
        count--;
      }

      this.deck[card.id] = count;

    }

    this.updateCount();
  }

  setCount(card: Card, count: number) {
    if (card.id) {
      if (count < 1) {
        delete this.deck[card.id];
      } else {
        this.deck[card.id] = count;
        this.cardMap.set(card.id, card);
      }
    }

    this.updateCount();
  }

  getCount(id: string) {
    return this.deck[id];
  }

  getDeck(proxyMode: boolean) {
    let cards: Card[] = [];

    Object.keys(this.deck).forEach(key => {

      let timesToAdd = proxyMode ? this.deck[key] : 1;
      let card = this.cardMap.get(key);
      if (card) {
        for(let i = 0; i < timesToAdd; i++) {
          cards.push(card);
        }
      }
    })

    let pokemon: Card[] = [];
    let trainers: Card[] = [];
    let energy: Card[] = [];

    cards.forEach(card => {
      if (card.supertype === 'Pokémon') {
        pokemon.push(card);
      } else if (card.supertype === 'Trainer') {
        trainers.push(card);
      } else if (card.supertype === 'Energy') {
        energy.push(card);
      }
    })

    this.sortPokemon(pokemon);
    trainers = this.sortTrainers(trainers);
    energy.sort((a,b) => a.name?.localeCompare(b.name ?? '') ?? 0);

    cards = [...pokemon, ...trainers, ...energy];

    return cards;

  }

  sortPokemon(cards: Card[]) {

    //TODO: this doesn't work for eevees :(
    let sorted = cards.sort((a,b) => {
      let aNumber = a.nationalPokedexNumbers ? a.nationalPokedexNumbers[0] : 0;
      let bNumber = b.nationalPokedexNumbers ? b.nationalPokedexNumbers[0] : 0;
      return aNumber - bNumber;
    })

    return sorted;
  }

  sortTrainers(cards: Card[]) {

    let subtypes: Map<string, Card[]> = new Map();

    cards.forEach(card => {
      let cards = [];
      if (card.subtypes && card.subtypes[0]) {
        let subtype = card.subtypes[0]
        cards = subtypes.get(subtype) ?? []; 
        cards.push(card);
        subtypes.set(subtype, cards);
      }
    })

    let toReturn = [];

    for (let toSort of subtypes.values()) {
      toReturn.push(... toSort.sort((a,b) => a.name?.localeCompare(b.name ?? '') ?? 1))
    }

    return toReturn;

  }

  private updateCount() {
    this.count = 0;

    Object.keys(this.deck).forEach(key => {
     
      let value = this.deck[key];
      this.count += value;

      if (value == 0) {
        delete this.deck[key];
        this.cardMap.delete(key);
      }

    })
  
    this.deckUpdated.next();

  }

}
