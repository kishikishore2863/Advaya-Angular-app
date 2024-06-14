import { ProductService } from './../../service/productservice';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ImportsModule } from '../import';
import { Product } from '../../domain/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
    products: any;

    responsiveOptions: any[] | undefined;
    isHovered: boolean = false;

    onMouseEnter() {
      this.isHovered = true;
    }
  
    onMouseLeave() {
      this.isHovered = false;
    }

    constructor(private productService: ProductService) {
        
        this.getProductDetails();

    }

    // ngOnInit() {
        getProductDetails(){
        this.productService.getProductsDetails().then((products) => {
            this.products = products;
        });

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    // getProductDetails() {
    //     this.productService.getProductsDetails().then((productsDetails) => { 
    //         this.productDetails = productsDetails;
    //     });
    // }

    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //             default:
    //               return 'info'; 
    //     }
    // }
}

