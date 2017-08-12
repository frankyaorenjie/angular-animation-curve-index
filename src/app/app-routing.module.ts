/**
 * Created by renjie on 16/6/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: AppComponent },
];

@NgModule ({
  imports: [ RouterModule.forRoot (routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
