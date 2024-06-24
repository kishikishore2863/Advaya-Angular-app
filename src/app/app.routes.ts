import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductComponent } from './product/product.component';
import { KnowUsComponent } from './know-us/know-us.component';
import { ProductsComponent } from './products/products.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'products', component: ProductComponent },
  { path: 'know-us', component: KnowUsComponent },
  { path: 'productss', component: ProductsComponent },
];

export { routes };
