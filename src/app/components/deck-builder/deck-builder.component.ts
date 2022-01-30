import { Component, OnInit } from '@angular/core';
import { Card, Filter, PokemontcgIoService, Set, SetSearch, SingleValueProperty } from 'ngx-pokemontcg-io';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Deck } from 'src/app/modals/deck';
import { DeckListTrackerService } from 'src/app/services/deck-list-tracker.service';
import { ExportImportService } from 'src/app/services/exportimport.service';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.scss']
})
export class DeckBuilderComponent implements OnInit {

  listOfSets: Array<Set> = [];
  selectedSet: Set | undefined;

  viewDeck: boolean = false;
  editMode: boolean = false;
  screenshotMode: boolean = false;
  proxyMode: boolean = false;

  printMode: boolean = false;

  constructor(private ptcgApi: PokemontcgIoService,
    public tracker: DeckListTrackerService,
    public importService: ExportImportService) { }

  ngOnInit(): void {
    lastValueFrom(this.ptcgApi.getSets()).then((res) => {
      this.listOfSets = res;
      this.importService.sets = res;

      this.onImportFromPtcgo();

    });
  }

  onImportFromPtcgo() {

    let ptcgo = prompt('Deck list');

    if (ptcgo) {
      let list = this.importService.ptcgoParse(ptcgo);

      lastValueFrom(this.importService.getCardsFromApi(list)).then(res => {
        this.tracker.deck = list;
          Object.keys(list).forEach(key => {
            let card = res.find(c => c.id === key);
            if (card) {
              this.tracker.setCount(card, list[key]);
              this.tracker
            }
          })
      })
    }
  }


  onSave() {
    console.log(this.tracker.deck);
  }



}
