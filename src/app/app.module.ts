import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    DashboardModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'am' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
