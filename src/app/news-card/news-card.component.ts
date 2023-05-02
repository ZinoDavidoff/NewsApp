import { Component, Input } from '@angular/core';
import { Categories, NewsArticle } from '../interfaces/interfaces.models';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {

  @Input()
  newsArticle!: NewsArticle;

  getCategoryClass(category: string) {
    switch (category) {
      case Categories.AKTUALITET:
        return 'aktualitet';
      case Categories.POLITIKE:
        return 'politike';
      case Categories.KULTURE:
        return 'kulture';
      case Categories.EKONOMI:
        return 'ekonomi';
      case Categories.RAJONI:
        return 'rajoni';
      case Categories.SPORT:
        return 'sport';
      case Categories.SHOWBIZ:
        return 'showbiz';
      default:
        return '';
    }
  }

}
