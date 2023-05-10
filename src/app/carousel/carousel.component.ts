import { Component, Input } from '@angular/core';
import { NewsArticle } from '../interfaces/interfaces.models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {

  @Input()
  carouselNewsArticle!: NewsArticle[];
    activeSlide: number;
    slides: any;

}
