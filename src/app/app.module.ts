import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScoreInputComponent } from './components/score-input/score-input.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { GameDashboardComponent } from './components/game-dashboard/game-dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'dashboard', component: GameDashboardComponent},
  {path: 'players', component: AddPlayerComponent, canActivate:[AuthGuard]},
  {path: 'add-score', component: ScoreInputComponent},
  {path: 'login', component: LoginComponent},
  {path: '',redirectTo:'/dashboard',pathMatch:'full'},
  {path: '**',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ScoreInputComponent,
    AddPlayerComponent,
    GameDashboardComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, {useHash: true}),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
