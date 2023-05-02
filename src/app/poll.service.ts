import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Poll {
  id: number;
  question: string;
  yesAnswer: string;
  noAnswer: string;
  yesVotes: number;
  noVotes: number;
  creationDate: Date;
  isArchived: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private baseUrl = 'http://localhost:3000/polls';

  constructor(private http: HttpClient) { }

  hasVotedForPoll(id: number): boolean {
    return localStorage.getItem(`hasVoted-${id}`) === 'true';
  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.baseUrl);
  }

  getPoll(id: number): Observable<Poll> {
    return this.http.get<Poll>(`${this.baseUrl}/${id}`);
  }

  getLastPoll(): Observable<Poll> {
    return this.getPolls().pipe(
      map(polls => polls.filter(poll => !poll.isArchived)),
      map(polls => polls.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())),
      map(polls => polls[0])
    );
  }

  addPoll(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>(this.baseUrl, poll);
  }

  deletePoll(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updatePollVotes(id: number, yesVotes: number, noVotes: number): Observable<Poll> {
    const pollUpdates = { yesVotes, noVotes};
    return this.http.patch<Poll>(`${this.baseUrl}/${id}`, pollUpdates);
  }

  archivePoll(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, { isArchived: true });
  }

}