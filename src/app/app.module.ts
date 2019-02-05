import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    DashboardModule, 
    BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'am' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
