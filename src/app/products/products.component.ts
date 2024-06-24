// import { title } from 'process';
// import { Product } from './../../domain/product';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [],
//   templateUrl: './products.component.html',
//   styleUrl: './products.component.css'
// })
// export class ProductsComponent {
//   products:any=[{
//     id:'01',
//     title:'Catch Chicken Masala',
//     image:["../../assets/img/unnamed (1).jpg"],
//     price:{
//       '100g':'100',
//       '200g':'200',
//       '500g':'500'
//     },
//     description:'lorem'
    
//   } ,{
//     id:'02',
//     image:["../../assets/img/unnamed (2).jpg"],
//     price:{
//       '100g':'100',
//       '200g':'200',
//       '500g':'500'
//     },
//     description:'lorem'
    
//   } ,{
//     id:'03',
//     image:["../../assets/img/unnamed (2).jpg"],
//     price:{
//       '100g':'100',
//       '200g':'200',
//       '500g':'500'
//     },
//     description:'lorem'
    
//   } ,{
//     id:'04',
//     image:["../../assets/img/unnamed (3).jpg"],
//     price:{
//       '100g':'100',
//       '200g':'200',
//       '500g':'500'
//     },
//     description:'lorem'
    
//   } 
//   ];


// }

// products.component.ts
import { Component } from '@angular/core';
import { Productss } from './../../domain/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productss: Productss[] = [
    {
      id: '01',
      title: 'Catch Chicken Masala',
      image: "../../assets/img/unnamed (1).jpg",
      price: {
        '100g': '100',
        '200g': '200',
        '500g': '500'
      },
      description: 'lorem'
    },
    {
      id: '02',
      title: 'Catch Chicken Masala',
      image: "../../assets/img/unnamed (2).jpg",
      price: {
        '100g': '100',
        '200g': '200',
        '500g': '500'
      },
      description: 'lorem'
    }, {
      id: '01',
      title: 'Catch Chicken Masala',
      image: "../../assets/img/unnamed (1).jpg",
      price: {
        '100g': '100',
        '200g': '200',
        '500g': '500'
      },
      description: 'lorem'
    }, {
      id: '01',
      title: 'Catch Chicken Masala',
      image: "../../assets/img/unnamed (1).jpg",
      price: {
        '100g': '100',
        '200g': '200',
        '500g': '500'
      },
      description: 'lorem'
    }, {
      id: '01',
      title: 'Catch Chicken Masala',
      image: "../../assets/img/unnamed (1).jpg",
      price: {
        '100g': '100',
        '200g': '200',
        '500g': '500'
      },
      description: 'lorem'
    }
  ];
}