import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-news-login',
  templateUrl: './news-login.component.html',
  styleUrls: ['./news-login.component.scss']
})
export class NewsLoginComponent {

  public loginForm!: FormGroup;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: [''],
      password: ['', Validators.required]
    })
  }
  
  login() {
    this.http.get<any>("http://localhost:3000/signInAdmin")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
        });
        if (user) {
          this.notifyService.showInfo("Successfully Login", "Welcome back Admin")
          this.loginForm.reset();
          this.router.navigate(["panel"]);
        } else {
          this.notifyService.showError("User not found", "")
        }
      })
  }
}
