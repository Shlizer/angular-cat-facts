import { NgModule, OnInit } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthService } from './core/auth.service'
import { CoreModule } from './core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [BrowserModule, CoreModule, AppRoutingModule, InfiniteScrollModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.verifyAuth()
  }
}
