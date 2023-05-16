import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PollService } from '../poll.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-news-newpoll',
  templateUrl: './news-newpoll.component.html',
  styleUrls: ['./news-newpoll.component.scss']
})
export class NewsNewpollComponent implements OnInit {

  pollForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollService,
    private notifyService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pollForm = this.formBuilder.group({
      question: ['', Validators.required],
      yesAnswer: ['', Validators.required],
      noAnswer: ['', Validators.required],
      yesVotes: [0],
      noVotes: [0],
      creationDate: [new Date()],
      isArchived: [false]
    });
  }

  addPoll(): void {
    this.pollService.addPoll(this.pollForm.value)
    .subscribe(() => {
      this.notifyService.showInfo("Success", `The News Poll has been created`)
      this.router.navigate(['/allpolls']);
    },
    error => {
      this.notifyService.showError("Error", `${error}`)
    });
  }

}