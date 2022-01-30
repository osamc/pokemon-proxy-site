import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'ngx-pokemontcg-io';
import { DeckListTrackerService } from 'src/app/services/deck-list-tracker.service';

@Component({
  selector: 'proxy-view',
  templateUrl: './proxy-view.component.html',
  styleUrls: ['./proxy-view.component.scss']
})
export class ProxyViewComponent implements OnInit {

  @Input()
  deck: Card[] = [];

  constructor(private deckTracker: DeckListTrackerService) { }
  
  ngOnInit(): void {
    this.loadDeck();

    this.deckTracker.deckUpdated.subscribe(() => this.loadDeck());

  }

  loadDeck() {
    this.deck = this.deckTracker.getDeck(true);
  }

}
