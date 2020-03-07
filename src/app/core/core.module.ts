import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { MaterialModule } from './material/material.module';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    TestComponent
  ],
  providers: [AuthGuard, AdminGuard]
})
export class CoreModule { }