import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/product';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.mountForm();
  }

  formProduct: FormGroup;
  product: Product = null;

  mountForm() {
    this.formProduct = this.fb.group({
      name: [''],
      category: [''],
      price: [''],
      brand: [''],
      description: [''],
      image: ''
    });
  }

  sendForm(){
    console.log(this.formProduct.value);
  }

}
