import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DisplayErrorComponent } from './reusable/display-error/display-error.component';
import { ErrorNameDirective } from './resuable/error-name.directive';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ViewListsComponent } from './components/view-lists/view-lists.component';
import { MatCardModule } from '@angular/material/card';
import { DeckViewerComponent } from './components/deck-viewer/deck-viewer.component';
import { DeckBuilderComponent } from './components/deck-builder/deck-builder.component';
import { NgxPokemonTcgIoModule } from 'ngx-pokemontcg-io';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { SetDisplayComponent } from './components/set-display/set-display.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProxyViewComponent } from './components/proxy-view/proxy-view.component';
import { WindowComponent } from './components/window/window.component';
import { PortalModule } from '@angular/cdk/portal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DisplayErrorComponent,
    ErrorNameDirective,
    ViewListsComponent,
    DeckViewerComponent,
    DeckBuilderComponent,
    CardDisplayComponent,
    SetDisplayComponent,
    ProxyViewComponent,
    WindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    HotToastModule.forRoot(),
    MatMenuModule,
    MatSidenavModule,
    provideFirestore(() => getFirestore()),
    MatCardModule,
    NgxPokemonTcgIoModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    MatBadgeModule,
    MatCheckboxModule,
    PortalModule,
    DragDropModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
