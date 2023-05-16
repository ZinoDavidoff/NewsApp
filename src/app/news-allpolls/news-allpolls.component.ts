import { Component, OnInit } from '@angular/core';
import { interval, map, timer } from 'rxjs';
import { Poll, PollService } from '../poll.service';

@Component({
  selector: 'app-news-allpolls',
  templateUrl: './news-allpolls.component.html',
  styleUrls: ['./news-allpolls.component.scss']
})
export class NewsAllpollsComponent implements OnInit {

  polls: Poll[] = [];
  
  constructor(private pollService: PollService) { }

  ngOnInit(): void {
    this.getAllPolls();
  }

  getAllPolls(): void {
    this.pollService.getPolls().pipe(
      map(polls =>
        polls.filter(poll => !poll.isArchived).sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
      ),
    ).subscribe(filteredPolls => {
      this.polls = filteredPolls;
      filteredPolls.forEach(poll => {
        const timeDiff = new Date().getTime() - new Date(poll.creationDate).getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        if (daysDiff > 60) {
          this.pollService.archivePoll(poll.id).subscribe();
        }
      });
    });
  }

  deletePoll(id: number): void {
    this.pollService.deletePoll(id)
      .subscribe(() => this.polls = this.polls.filter(poll => poll.id !== id));
  }

  archivePoll(id: number): void {
    const pollIndex = this.polls.findIndex(poll => poll.id === id);
    if (pollIndex > -1) {
      this.pollService.archivePoll(id).subscribe(() => {
        this.polls[pollIndex].isArchived = true;
        this.polls = this.polls.filter(poll => !poll.isArchived);
      });
    }
  }

}