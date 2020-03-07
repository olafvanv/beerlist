import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { CoreModule } from './core/core.module';
import { ListComponent } from './list/list.component';
import { ManageListComponent } from './manage-list/manage-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoaderInterceptor } from './core/interceptors/loader-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FirestoreSettingsToken, AngularFirestoreModule } from '@angular/fire/firestore';
import { AddBeerDialog } from './dialogs/add-beer-dialog/add-beer-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UserBlockComponent } from './navigation/user-block/user-block.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    RegisterComponent,
    UserComponent,
    ListComponent,
    ManageListComponent,
    NavigationComponent,
    AddBeerDialog,
    UserBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
    },
    { 
      provide: FirestoreSettingsToken, 
      useValue: {} 
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddBeerDialog
  ]
})
export class AppModule { }
