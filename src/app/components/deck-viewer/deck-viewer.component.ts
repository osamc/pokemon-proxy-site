import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Card } from 'ngx-pokemontcg-io';
import { Subject, Subscription } from 'rxjs';
import { DeckListTrackerService } from 'src/app/services/deck-list-tracker.service';

@Component({
  selector: 'deck-viewer',
  templateUrl: './deck-viewer.component.html',
  styleUrls: ['./deck-viewer.component.scss']
})
export class DeckViewerComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  screenshotMode: boolean = false;

  @Input()
  editMode: boolean = false;

  @Input()
  proxyMode: boolean = false;

  deck: Card[] = [];
  deckSub: Subscription | undefined;

  constructor(private deckTracker: DeckListTrackerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screenshotMode'] || changes['editMode'] || changes['proxyMode']) {
      this.loadDeck();
    }
  }

  ngOnInit(): void {
    this.loadDeck();
    this.deckSub = this.deckTracker.deckUpdated.subscribe(() => this.loadDeck());
  }

  ngOnDestroy(): void {
    this.deckSub?.unsubscribe();
  }

  loadDeck() {
    this.deck = this.deckTracker.getDeck(this.proxyMode);
  }

  drop(event: any) {
    console.log(event);
  }

}
