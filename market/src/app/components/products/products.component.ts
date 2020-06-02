import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../services/crud.service';
import { ReplaySubject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/products';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private crud: CrudService) { }

  destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  products: Product[] = [];
  p: number = 1;
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.crud.getData('/products').pipe(takeUntil(this.destroy)).subscribe((productsReceived) => {
      this.products = productsReceived;
      let newProducts = this.products.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      console.log(this.products);
    }, error => {
      this.isSuccess = false;
      this.isError = true;
      this.errorMessage = error;
      console.log(error);
    })
  }

}
