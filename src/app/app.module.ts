import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { InputComponent } from './input/input.component';
import { NotesComponent } from './notes/notes.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoteComponent } from './notes/note/note.component';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from './notes/store/notes.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './auth/auth.effects';
import { EditComponent } from './input/edit/edit.component';
import { NoteEditDialogComponent } from './notes/note-edit-dialog/note-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidenavComponent,
    InputComponent,
    NotesComponent,
    PageNotFoundComponent,
    NoteComponent,
    EditComponent,
    NoteEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([NotesEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
