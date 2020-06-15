import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/product';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnDestroy {

  constructor(private crud: CrudService, private router: Router, private fb: FormBuilder) { }

  product: Product;
  products: Product[] = [];
  isSuccess?: boolean = false;
  isError?: boolean = false;
  errorMessage: string = null;
  p: number = 1;
  destroy: ReplaySubject<boolean> = new ReplaySubject(1);

  formVisibility: FormGroup;

  ngOnInit(): void {
    this.getProducts();
    this.mountForm();
  }

  mountForm(){
    this.formVisibility = this.fb.group({
      isShow: false
    });
  }

  getUserToEditProduct(id: string){
    this.router.navigate(['home/addProduto', id]);
  }

  changeVisibility(event){
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.value;
    let isChecked = !target.checked;

    let confirm = window.confirm('Você deseja alterar a visibilidade do produto na sua loja?');
    
    if(confirm){
      if(isChecked === true){
        this.formVisibility.get('isShow').patchValue(false);
      }  else {
        if(isChecked === false){
          this.formVisibility.get('isShow').patchValue(true);
        }

      }
      
      let checkboxIsMarked = this.formVisibility.value;
      this.sendForm(checkboxIsMarked, id);
    } else {
      return;
    }
  }

  sendForm(checkboxIsMarked: boolean, id: string){

    this.crud.updateData(id, checkboxIsMarked, '/products').subscribe((response) => {
      this.isSuccess = true;
      this.isError = false;
    }, error => {
      console.log(error);
      this.isError = true;
      this.isSuccess = false;
      this.errorMessage = error;
    })
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
      this.products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
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
