import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Categories, NewsArticle } from '../interfaces/interfaces.models';
import { NewsService } from '../news.service';
import { NotificationService } from '../notification.service';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss']
})
export class NewsPanelComponent implements OnInit, OnDestroy {

  allNewsArticles: NewsArticle[] = [];
  searchTerm = new FormControl('');
  loading = false;
  destroy$ = new Subject<void>();
  isSearchResultsVisible = false;
  routerSubscription: Subscription;

  constructor(private newsService: NewsService, private notifyService: NotificationService) {}

  ngOnInit(): void {
    this.getAllNewsArticles()

    this.searchTerm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((searchValue: string) => {
        this.loading = true;
        return this.newsService.getAllNewsArticles().pipe(
          map((articles: NewsArticle[]) => {
            return articles
              .filter((article) =>
                article.title.toLowerCase().includes(searchValue.toLowerCase())
              );
          }),
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((filteredNews: NewsArticle[]) => {
      timer(300).subscribe(() => {
        this.loading = false;
        this.allNewsArticles = filteredNews;
      });
    });
  }

  getAllNewsArticles() {
    this.newsService.getAllNewsArticles()
    .pipe(
      map((articles: NewsArticle[]) => {
        return articles
          .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
      }),
    )
    .subscribe(news => {
      this.allNewsArticles = news;
    })  
  }

  deleteNewsArticle(id: number) {
    console.log("Deleting article with ID", id); // Log the ID parameter
    this.newsService.deleteNewsArticle(id)
    .subscribe(
      () => {
        const index = this.allNewsArticles.findIndex(a => a.id === id);
        if (index !== -1) {
          this.allNewsArticles.splice(index, 1);
        }
        this.notifyService.showInfo("Success", `The News Article with ID ${id} has been deleted`)
      },
      error => {
        this.notifyService.showError("Error", `${error}`)
      }
    )
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
