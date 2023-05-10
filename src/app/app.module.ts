import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsSidebarComponent } from './news-sidebar/news-sidebar.component';
import { NewsNavbarComponent } from './news-navbar/news-navbar.component';
import { NewsFooterComponent } from './news-footer/news-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewsPanelComponent } from './news-panel/news-panel.component';
import { NewsHomeComponent } from './news-home/news-home.component';
import { NewsLoginComponent } from './news-login/news-login.component';
import { NewsNewComponent } from './news-new/news-new.component';

import { registerLocaleData } from "@angular/common";
import localeSq from "@angular/common/locales/sq";
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsSearchComponent } from './news-search/news-search.component';
import { NewsAllpollsComponent } from './news-allpolls/news-allpolls.component';
import { NewsPollComponent } from './news-poll/news-poll.component';
import { NewsNewpollComponent } from './news-newpoll/news-newpoll.component';

registerLocaleData(localeSq);

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    NewsCardComponent,
    NewsSidebarComponent,
    NewsNavbarComponent,
    NewsFooterComponent,
    NewsPanelComponent,
    NewsHomeComponent,
    NewsLoginComponent,
    NewsNewComponent,
    NewsDetailsComponent,
    NewsSearchComponent,
    NewsAllpollsComponent,
    NewsPollComponent,
    NewsNewpollComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      timeOut: 3000,
      newestOnTop: true,
      easing: 'ease-in',
      easeTime: 300
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
