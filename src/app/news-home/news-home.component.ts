import { Component, Input, OnInit } from '@angular/core';
import { NewsArticle } from '../interfaces/interfaces.models';
import { NewsService } from '../news.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.scss']
})
export class NewsHomeComponent {

  @Input() searchQuery: string;
  firstThreeNewsArticles!: NewsArticle[];
  remainingNewsArticles!: NewsArticle[];
  allNewsArticles: NewsArticle[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAllNewsArticles()
  }

  get _firstThreeNewsArticles() {
    const filteredArticles = this.allNewsArticles.filter(article => article.isFeatured === false).slice(0, 3);
    this.firstThreeNewsArticles = [...filteredArticles];
    return this.firstThreeNewsArticles;
  }

  get _remainingNewsArticles() {
    const filteredArticles = this.allNewsArticles.filter(article => article.isFeatured === false).slice(3);
    this.remainingNewsArticles = [...filteredArticles];
    return this.remainingNewsArticles;
  }
  
  getAllNewsArticles() {
    this.newsService.getAllNewsArticles().pipe(
      map(articles => articles.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()))
    )
    .subscribe(news => {
      this.allNewsArticles = news;
    })  
  }

}
