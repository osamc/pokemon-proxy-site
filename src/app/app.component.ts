import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PokemontcgIoService } from 'ngx-pokemontcg-io';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { DecklistStorageService } from './services/decklist-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthenticationService,
    private router: Router,
    private ptcgApi: PokemontcgIoService
  ) {
    ptcgApi.apiKey = '4da0c1ce-8005-4d60-888f-2df76250f6af'
  }

  logout() {
    lastValueFrom(this.authService.logout()).then(() => {
      this.router.navigate([''])
    })
  }

}
