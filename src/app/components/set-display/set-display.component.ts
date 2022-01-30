import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddToastRef, CreateHotToastRef, HotToastService } from '@ngneat/hot-toast';
import { Card, Filter, PokemontcgIoService, Set, SetSearch, SingleValueProperty } from 'ngx-pokemontcg-io';
import { lastValueFrom } from 'rxjs';
import { ExportImportService } from 'src/app/services/exportimport.service';

@Component({
  selector: 'set-display',
  templateUrl: './set-display.component.html',
  styleUrls: ['./set-display.component.scss']
})
export class SetDisplayComponent implements OnChanges {

  @Input()
  set: Set | undefined;

  loading: boolean = false;
  loadingToastRef: CreateHotToastRef<any> | undefined;

  imagesLoaded: number = 0;

  cards: Card[] = [];

  constructor(private ptcgApi: PokemontcgIoService,
    private toast: HotToastService,
    private importService: ExportImportService) { }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['set'] && changes['set'].currentValue) {
      let filter: Filter = new Filter();
      if (this.set && this.set.id) {
        let setFilterProp = new SingleValueProperty(SetSearch.ID, this.set.id);
        filter = new Filter([setFilterProp]);
      }

      this.loadingToastRef = this.toast.loading('Loading Set Images')

      this.loading = true;

      lastValueFrom(this.ptcgApi.searchCards(filter)).then(res => {
        if (res.data) {
          res.data.sort((a, b) => {
            //lets sort them
            if (a.number && b.number) {
              //for some reason they're strings so cast to numbers
              return +a.number - +b.number
            }
            return -1;
          });

          this.imagesLoaded = 0;
          this.cards = res.data;
        }
      })
    }
  }

  onImageLoad(card: Card) {
    this.imagesLoaded++;
    if (this.imagesLoaded == this.cards.length) {
      this.loading = false;

      if(this.loadingToastRef) {
        this.loadingToastRef.close();
      }
    }


  }



}
