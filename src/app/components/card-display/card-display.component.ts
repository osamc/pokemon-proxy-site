import { Component, Input, OnInit, Output } from '@angular/core';
import { Card } from 'ngx-pokemontcg-io';
import { Subject } from 'rxjs';
import { DeckListTrackerService } from 'src/app/services/deck-list-tracker.service';

@Component({
  selector: 'card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent implements OnInit {

  @Input()
  card: Card | undefined;

  @Input()
  builderMode: boolean = true;

  @Input()
  screenshotMode: boolean = false;

  @Output()
  imageLoaded: Subject<void> = new Subject<void>();

  count: number = 0;

  constructor(private tracker: DeckListTrackerService) { }

  ngOnInit(): void {
    this.updateCount();
    this.tracker.deckUpdated.subscribe(res => this.updateCount());
  }

  updateCount(): void {
    if (this.card && this.card.id) {
      this.count = this.tracker.getCount(this.card.id) ?? 0;
    }
  }

  addCard() {
    if (this.card) {
      this.count++;
      this.tracker.addCard(this.card);
    }
  }

  removeCard() {
    if (this.card) {
      this.count--;
      this.tracker.removeCard(this.card);
    }
  }

  manualInput() {
    if (this.card) {
      this.tracker.setCount(this.card, this.count);
    }
  }

  onImageLoad() {
    this.imageLoaded.next();
  }

}
