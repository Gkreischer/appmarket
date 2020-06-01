import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/product';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private crud: CrudService) { }

  isSuccess?: boolean = false;
  isError?: boolean = true;
  errorMessage: string = null;
  products: Product[] = [];

  destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  ngOnInit(): void {
    this.getProducts();
  } 

  getProducts(){
    this.crud.getData('/products').pipe(takeUntil(this.destroy)).subscribe((products) => {
      console.log(products);
      this.products = products;
    }, error => {
      console.log(error);
      this.isError = true;
      this.isSuccess = false;
      this.errorMessage = error;
    })
  }

  ngOnDestroy(){
    this.destroy.next(true);
    this.destroy.complete();
  }

}
