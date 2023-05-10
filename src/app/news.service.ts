import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NewsArticle } from './interfaces/interfaces.models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseURL: string = 'http://localhost:3000/newsArticles';

  constructor(private http: HttpClient) { }

  getAllNewsArticles(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(`${this.baseURL}`)
  }

  addNewsArticle(news: NewsArticle): Observable<NewsArticle> {
    return this.http.post<NewsArticle>(`${this.baseURL}`, news)
  }

  updateNewsArticle(id: number, news: NewsArticle): Observable<NewsArticle> {
    return this.http.put<NewsArticle>(`${this.baseURL}/${id}`, news)
  }

  deleteNewsArticle(id: number): Observable<NewsArticle> {
    return this.http.delete<NewsArticle>(`${this.baseURL}/${id}`)
  }

  getNewsArticleById(id: number): Observable<any> {
    return this.http.get<NewsArticle>(`${this.baseURL}/${id}`);
  }

}
