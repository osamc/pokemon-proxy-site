import { Component, Input, OnInit } from '@angular/core';
import { Deck } from 'src/app/modals/deck';

@Component({
  selector: 'app-view-lists',
  templateUrl: './view-lists.component.html',
  styleUrls: ['./view-lists.component.scss']
})
export class ViewListsComponent implements OnInit {

  @Input()
  decks: Deck[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
