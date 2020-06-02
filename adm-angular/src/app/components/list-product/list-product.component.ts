import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/product';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnDestroy {

  constructor(private crud: CrudService, private router: Router) { }

  products: Product[] = [];
  isSuccess?: boolean = false;
  isError?: boolean = false;
  errorMessage: string = null;
  p: number = 1;
  destroy: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnInit(): void {
    this.getProducts();
  }

  getUserToEditProduct(id: string){
    this.router.navigate(['home/addProduto', id]);
  }

  getInfoOfSelectProduct(event){
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.value;

    this.crud.getSpecificData(id, '/products').subscribe((product) => {
      console.log(product);
      this.getUserToEditProduct(id);
    }, error => {
      console.log(error);
      this.isError = true;
      this.isSuccess = false;
      this.errorMessage = error;
    });
  }

  getProducts() {
    this.crud.getData('/products').pipe(takeUntil(this.destroy)).subscribe((products) => {
      console.log(products);
      this.products = products;
      this.isSuccess = true;
      this.isError = false;
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

  deleteProduct(event, i) {
    
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.value;
    
    let userConfirmation = confirm('Deseja realmente deletar esse produto?');

    if(userConfirmation){
      
      this.crud.deleteData('/products', id).subscribe((res) => {
        console.log(res);
        this.isSuccess = true;
        this.isError = false;
      }, error => {
        console.log(error);
        this.isError = true;
        this.isSuccess = false;
        this.errorMessage = error;
      })
      this.products.splice(i, 1);
    } else {
      return;
    }
  }

}
