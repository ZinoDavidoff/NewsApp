import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPanelComponent } from './news-panel/news-panel.component';
import { NewsHomeComponent } from './news-home/news-home.component';
import { NewsLoginComponent } from './news-login/news-login.component';
import { NewsNewComponent } from './news-new/news-new.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsPollComponent } from './news-poll/news-poll.component';
import { NewsNewpollComponent } from './news-newpoll/news-newpoll.component';

const routes: Routes = [
  { path: '', redirectTo: '/allnewsarticles', pathMatch: 'full' },
  { path: 'allnewsarticles', component: NewsHomeComponent },
  { path: 'allnewsarticles/article/:id', component: NewsDetailsComponent },
  { path: 'login', component: NewsLoginComponent },
  { path: 'panel', component: NewsPanelComponent },
  { path: 'panel/:id', component: NewsNewComponent },
  { path: 'newarticle', component: NewsNewComponent },
  { path: 'newpoll', component: NewsNewpollComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
