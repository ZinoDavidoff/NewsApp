import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewsService } from '../news.service';
import { NewsArticle } from '../interfaces/interfaces.models';
import { NotificationService } from '../notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-new',
  templateUrl: './news-new.component.html',
  styleUrls: ['./news-new.component.scss']
})
export class NewsNewComponent implements OnInit {

  allNewsArticles: NewsArticle[];
  articleForm: FormGroup;
  hasId: boolean = false;
  publishedDate: Date;
  categories = ['Aktualitet', 'Politike', 'Kulture', 'Ekonomi', 'Rajoni', 'Sport', 'Showbiz'];
  isOpen = false;
  selectedCategory: string;

  constructor(
    private newsService: NewsService,
    private notifyService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    // const id = +this.route.snapshot.params['id'];
    const id = +this.route.snapshot.paramMap.get('id');
   
    if (id) {
      this.hasId = true;
      this.getNewsArticleById(id);
    }

    this.articleForm = new FormGroup({
      id: new FormControl(this.generateRandomId()),
      author: new FormControl(''),
      category: new FormControl(''),
      title: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
      isFeatured: new FormControl(false)
    });

  }

  generateRandomId(): number {
    let randomNumber = 0;
    while (randomNumber < 100000) {
      randomNumber = Math.floor(Math.random() * 1000000);
      this.newsService.getAllNewsArticles().subscribe(
        (response: NewsArticle[]) => {
          let newsId = response.find(n => n.id === randomNumber);
          if (newsId) {
            this.generateRandomId();
          }
        }
      )
    }
    return parseInt(randomNumber.toString().padStart(6, '0'));
  }

  addNewArticle() {
    const article: NewsArticle = {
      id: this.articleForm.get('id').value,
      title: this.articleForm.get('title').value,
      author: this.articleForm.get('author').value,
      category: this.articleForm.get('category').value,
      image: this.articleForm.get('image').value,
      description: this.articleForm.get('description').value,
      isFeatured: this.articleForm.get('isFeatured').value,
      published: new Date()
    };
    this.newsService.addNewsArticle(article).subscribe(
      () => {
        this.notifyService.showInfo("Success", `A new News Article with id ${article.id} has been added`)
      },
      error => {
        this.notifyService.showError("Error", `${error}`)
      }
    );
    this.articleForm.reset();
    this.router.navigate(['/allnewsarticles']);
  }

  getNewsArticleById(id: number) {
    this.newsService.getNewsArticleById(id).subscribe((item: NewsArticle) => {
      this.articleForm.patchValue(item);
      this.publishedDate = item.published
      this.selectedCategory = this.articleForm.get('category').value
    });
  }

  editNewsArticle() {
    const article: NewsArticle = {
      id: this.articleForm.get('id').value,
      title: this.articleForm.get('title').value,
      author: this.articleForm.get('author').value,
      category: this.articleForm.get('category').value,
      image: this.articleForm.get('image').value,
      description: this.articleForm.get('description').value,
      isFeatured: this.articleForm.get('isFeatured').value,
      published: new Date()
    };
    this.newsService.updateNewsArticle(article.id, article).subscribe(
      () => {
        this.notifyService.showInfo("Success", `The News Article with id ${article.id} has been updated`)
      },
      error => {
        this.notifyService.showError("Error", `${error}`)
      }
    );
    this.articleForm.reset();
    this.router.navigate(['/allnewsarticles']);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.articleForm.get('category').setValue(category);
    this.isOpen = false;
  }

}
