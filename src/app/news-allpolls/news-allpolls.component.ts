import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
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
    this.getAllPolls()
  }

  getAllPolls(): void {
    this.pollService.getPolls().pipe(
      map(polls => polls.filter(poll => !poll.isArchived))
    ).subscribe(filteredPolls => {
      this.polls = filteredPolls;
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