import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, debounceTime, delay, distinctUntilChanged, map, of, startWith, switchMap, takeUntil, tap, timer } from 'rxjs';
import { NewsArticle } from '../interfaces/interfaces.models';
import { NewsService } from '../news.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss']
})
export class NewsSearchComponent implements OnInit, OnDestroy {

  searchTerm = new FormControl('');
  filteredNews: NewsArticle[];
  loading = false;
  destroy$ = new Subject<void>();
  isSearchResultsVisible = false;
  routerSubscription: Subscription;

  constructor(private newsService: NewsService, private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.searchTerm.reset();
        this.filteredNews = [];
      }
    });

    this.searchTerm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((searchValue: string) => {
        this.loading = true;
        return this.newsService.getAllNewsArticles().pipe(
          map((articles: NewsArticle[]) => {
            return articles
              .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
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
        this.filteredNews = filteredNews;
      });
    });

  }

  onSearchInputClick() {
    this.isSearchResultsVisible = true;
    document.addEventListener('click', this.onClickOutsideSearchResults.bind(this));
  }

  onClickOutsideSearchResults(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isSearchResultsVisible = false;
      document.removeEventListener('click', this.onClickOutsideSearchResults);
      this.searchTerm.setValue('');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
