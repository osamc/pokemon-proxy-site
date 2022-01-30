import { Component, OnInit } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { Deck } from 'src/app/modals/deck';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DecklistStorageService } from 'src/app/services/decklist-storage.service';

// import * as SpriteData from 'pokesprite-images/data/pokemon.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usersLists: Deck[] = [];
  publicLists: Deck[] = [];

  constructor(public authService: AuthenticationService,
    public decklist: DecklistStorageService) {
  }

  ngOnInit(): void {

    // firstValueFrom(this.decklist.addDeckList({
    //   list: {'xy-1': 1},
    //   name: 'test',
    //   public: true
    // })).then(res => {
      
    // })

    firstValueFrom(this.decklist.listOwnedDeckLists()).then(res => {
      this.usersLists = res; 
    })

    firstValueFrom(this.decklist.listPublicDeckLists()).then(res => {
      this.publicLists = res;
    })

    // firstValueFrom(this.decklist.addDeckList(deck)).then(res => {
    //   console.log(res);
    // })

    // firstValueFrom(this.decklist.retrieveDecklist('6SFi5bTnYr4eqoVsASR0')).then(res => {
    //   console.log(res);
    // });

    // firstValueFrom(this.decklist.listOwnedDeckLists()).then(res => {
    //   console.log(res);
    // })

    // firstValueFrom(this.decklist.listPublicDeckLists()).then(res => {
    //   console.log(res);
    // })

    //  firstValueFrom(this.decklist.retrieveDecklist('6SFi5bTnYr4eqoVsASR0')).then(res => {

    //   res.name = "something";

    //   firstValueFrom(this.decklist.updateDecklist(res)).then(() => {
    //     console.log('updated')
    //   })

    // });


    // firstValueFrom(this.decklist.deleteDecklist('6SFi5bTnYr4eqoVsASR0')).then(() => {
    //   console.log('deleted');
    // })




    // firstValueFrom(this.decklist.retrieveDecklist('WsJFfgDzzOus0XGdA9Ut')).then(res => {
    //   console.log(res);

    //   res.name = "update2";


    //   firstValueFrom(this.decklist.updateDecklist(res)).then(() => {
    //     alert('updated');
    //   })

    // })

  }

}
