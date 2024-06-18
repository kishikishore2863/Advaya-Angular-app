import { resolve } from 'node:path';
import { Injectable } from '@angular/core';
import { promises } from 'dns';

@Injectable()
export class ProductService {
  getProductDetails() {
    return [
      {
        productName: 'Product One',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        data: [
          { weight: '100g', price: 'Rs.250' },
          { weight: '250g', price: 'Rs.450' },
          { weight: '500g', price: 'Rs.600' },
        ],
        imagedata: [
          {
            image: '../assets/img/unnamed (1).jpg',
          },
          {
            image: '../assets/img/unnamed (4).jpg',
          },
        ],
      },
      {
        productName: 'Product Two',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',

        imagedata: [
          {
            image: '../assets/img/unnamed (1).jpg',
          },
          {
            image: '../assets/img/unnamed (4).jpg',
          },
        ],
        data: [
          { weight: '100g', price: 'Rs.250' },
          { weight: '250g', price: 'Rs.450' },
          { weight: '500g', price: 'Rs.600' },
        ],
      },
      {
        productName: 'Product Three',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',

        imagedata: [
          {
            image: '../assets/img/unnamed (1).jpg',
          },
          {
            image: '../assets/img/unnamed (4).jpg',
          },
        ],
        data: [
          { weight: '100g', price: 'Rs.250' },
          { weight: '250g', price: 'Rs.450' },
          { weight: '500g', price: 'Rs.600' },
        ],
      },
    ];
  }
  getCards() {
    return [
      {
        data: [
          { image: '../assets/img/unnamed (1).jpg' },
          { image: '../assets/img/unnamed (2).jpg' },
          { image: '../assets/img/unnamed (3).jpg' },
          { image: '../assets/img/unnamed (1).jpg' },
          { image: '../assets/img/unnamed (2).jpg' },
        ],
      },
    ];
  }

  getSliderCards() {
    return Promise.resolve(this.getCards());
  }

  getProductsDetails() {
    return Promise.resolve(this.getProductDetails());
  }
}
