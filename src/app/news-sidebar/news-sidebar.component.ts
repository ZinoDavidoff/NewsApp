import { Component, Input } from '@angular/core';
import { NewsArticle } from '../interfaces/interfaces.models';

@Component({
  selector: 'app-news-sidebar',
  templateUrl: './news-sidebar.component.html',
  styleUrls: ['./news-sidebar.component.scss']
})
export class NewsSidebarComponent {

  @Input()
  featuredArticles! : NewsArticle[];
}
