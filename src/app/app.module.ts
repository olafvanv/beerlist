import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { CoreModule } from './core/core.module';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './core/auth.guard';
import { ManageListComponent } from './manage-list/manage-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoaderInterceptor } from './core/interceptors/loader-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AddBeerDialog } from './dialogs/add-beer-dialog/add-beer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    RegisterComponent,
    UserComponent,
    ListComponent,
    ManageListComponent,
    NavigationComponent,
    AddBeerDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
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
