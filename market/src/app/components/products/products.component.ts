import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../services/crud.service';
import { ReplaySubject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/products';
import { Category } from 'src/app/shared/category';
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
  categories: Category[] = [];
  productsOfCategorySelected: Product[] = [];
  productSelectedDetails: Product = undefined;
  p: number = 1;
  isModalOpen: boolean = false;
  isCategoryEmpty: boolean = false;
  isCategoryClicked: boolean = false;
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.crud.getData('/products?filter[where][isShow]=true').pipe(takeUntil(this.destroy)).subscribe((productsReceived) => {
      this.products = productsReceived;
      this.products.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      console.log(this.products);
    }, error => {
      this.isSuccess = false;
      this.isError = true;
      this.errorMessage = error;
      console.log(error);
    });
  }

  getCategories() {
    this.crud.getData('/categories').pipe(takeUntil(this.destroy)).subscribe((categoriesReceived) => {
      this.categories = categoriesReceived;
    }, error => {
      this.isSuccess = false;
      this.isError = true;
      this.errorMessage = error;
    });
  }

  showProductsCategory(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let categoryValue = target.attributes.id.value;
    this.isCategoryClicked = true;
    this.crud.getSpecificDataWithTwoOptions('/products', 'category', 'isShow', categoryValue, "true").subscribe((productsReceived) => {

      this.productsOfCategorySelected = productsReceived;
      if(this.productsOfCategorySelected.length === 0){
        this.isCategoryEmpty = true;
      } else {
        this.isCategoryEmpty = false;
      }
    }, error => {
      console.log(error);
      console.log('Erro ao selecionar a categoria');
    })

  }

  toggleModal(event) {
    if (event !== 'null') {
      let target = event.target || event.srcElement || event.currentTarget;
      let id = target.attributes.id.value;
      this.loadInfoProductModal(id);
      return this.isModalOpen = !this.isModalOpen;
    } else {
      return;
    }
  }

  loadInfoProductModal(idReceived: string) {
    if (this.products.length !== 0) {
      console.log(this.products.find(product => product.id === idReceived));
      return this.productSelectedDetails = this.products.find(product => product.id === idReceived);
    } else {
      return;
    }
  }

}
