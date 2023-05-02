import { Component, OnInit } from '@angular/core';
import { Categories, NewsArticle } from '../interfaces/interfaces.models';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../news.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  firstThreeNewsArticles!: NewsArticle[];
  remainingNewsArticles!: NewsArticle[];
  allNewsArticles: NewsArticle[];
  article: NewsArticle;
  relatedArticles: NewsArticle[];

  previousArticle: NewsArticle | undefined;
  nextArticle: NewsArticle | undefined;
  newsArticleIndex: number;

  constructor(private route: ActivatedRoute, private router: Router, private newsService: NewsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.newsService.getNewsArticleById(id).subscribe((res) => {
        this.article = res;
        this.relatedArticles = this.getRelatedArticles(this.article.category);
      });
  
      this.getAllNewsArticles().then(() => {
        const currentIndex = this.allNewsArticles.findIndex((article) => article.id === id);
        this.previousArticle = currentIndex > 0 ? this.allNewsArticles[currentIndex - 1] : null;
        this.nextArticle = currentIndex < this.allNewsArticles.length - 1 ? this.allNewsArticles[currentIndex + 1] : null;
        this.relatedArticles = this.getRelatedArticles(this.article.category);
      });
    });
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
  
  async getAllNewsArticles() {
    this.allNewsArticles = await this.newsService
      .getAllNewsArticles()
      .pipe(
        map((articles) =>
          articles.sort(
            (a, b) =>
              new Date(b.published).getTime() - new Date(a.published).getTime()
          )
        )
      )
      .toPromise();
  }

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

  getRelatedArticles(category: string): NewsArticle[] {
    return this.allNewsArticles.filter(article => article.category === category && article.id !== this.article.id);
  }

}
