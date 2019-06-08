import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './core/auth.guard';
import { ManageListComponent } from './manage-list/manage-list.component';
import { AdminGuard } from './core/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'user', component: UserComponent},
  {path: 'manage', component: ManageListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'list', component: ListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
