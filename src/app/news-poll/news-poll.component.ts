import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-news-poll',
  templateUrl: './news-poll.component.html',
  styleUrls: ['./news-poll.component.scss']
})
export class NewsPollComponent implements OnInit {

  pollId: number;
  
  question: string;

  yesAnswer: string;
  noAnswer: string;

  yesVotes: number;
  noVotes: number;

  yesChecked: boolean;

  hasVoted: boolean = false;

  constructor(private pollService: PollService) { }

  ngOnInit(): void {
    this.getLastPoll();
  }

  getLastPoll(): void {
    this.pollService.getLastPoll()
      .subscribe((poll) => {
        this.question = poll.question;
        this.yesAnswer = poll.yesAnswer;
        this.noAnswer = poll.noAnswer;
        this.yesVotes = poll.yesVotes;
        this.noVotes = poll.noVotes;
        this.pollId = poll.id

        let hasVoted = this.pollService.hasVotedForPoll(this.pollId);
        if (hasVoted) {
          this.hasVoted = true;
          this.loadVotes();
        }
      })
  }

  vote(answer: boolean): void {
    if (!this.hasVoted) {
      if (answer) {
        this.yesVotes++;
      } else {
        this.noVotes++;
      }

      this.pollService.updatePollVotes(this.pollId, this.yesVotes, this.noVotes)
        .subscribe(() => {
          localStorage.setItem(`hasVoted-${this.pollId}`, 'true');
          this.hasVoted = true;
          this.saveVotes();
        });
    }
  }

  private saveVotes(): void {
    localStorage.setItem(`votes-${this.pollId}-yes`, this.yesVotes.toString());
    localStorage.setItem(`votes-${this.pollId}-no`, this.noVotes.toString());
  }

  private loadVotes(): void {
    let yesVotes = localStorage.getItem(`votes-${this.pollId}-yes`);
    if (yesVotes) {
      this.yesVotes = parseInt(yesVotes);
    }
    let noVotes = localStorage.getItem(`votes-${this.pollId}-no`);
    if (noVotes) {
      this.noVotes = parseInt(noVotes);
    }
  }

  get totalVotes(): number {
    return this.yesVotes + this.noVotes;
  }

  get yesPercentage(): number {
    return (this.yesVotes / this.totalVotes) * 100;
  }

  get noPercentage(): number {
    return (this.noVotes / this.totalVotes) * 100;
  }

}