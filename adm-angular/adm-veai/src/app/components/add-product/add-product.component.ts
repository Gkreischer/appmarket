import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/product';
import { CrudService } from 'src/app/services/crud.service';
import { baseUrl } from './../../shared/baseUrl';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private crud: CrudService, private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit(): void {
    this.mountForm();
    this.route.paramMap.subscribe(
      params => {
        if(params){
          this.loadProductInfoToEdit(params.get('id'));
        } else {
          console.log('No product to edit');
        }
      }
    );
  }

  formProduct: FormGroup;
  product: Product = null;
  selectedId: string = null;
  isSuccess?: boolean = false;
  isError?: boolean = false;
  errorMessage: string = null;
  fileUploadName: string = null;
  
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

  loadProductInfoToEdit(id: string) {
    this.crud.getSpecificData(id, '/products').subscribe((productInfo) => {
      console.log('Product loaded', productInfo);
      this.formProduct.patchValue(productInfo);
      this.selectedId = productInfo.id;
      let fileName = productInfo.image;
      this.fileUploadName = fileName.substring(fileName.indexOf("d/") + 2);
    }, error => {
      console.log(error);
      this.isError = true;
      this.isSuccess = false;
      this.errorMessage = error;
    })
  }

  sendForm(){
    this.product = this.formProduct.value;
    this.crud.addData(this.product, '/products').subscribe((res) => {
      console.log(res);
      this.isError = false;
      this.isSuccess = true;
    }, error => {
      console.log(error);
      this.errorMessage = error;
    })
  }

  updateProductAndGoBackRoute(event){
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.value;

    this.product = this.formProduct.value;

    this.crud.updateData(id, this.product, '/products').subscribe((res) => {
      console.log(res);
      this.router.navigate(['home/listarProdutos']);
    }, error => {
      this.isSuccess = false;
      this.isError = true;
      this.errorMessage = error;
    })
  }

  cancelSendForm(){
    this.formProduct.reset();
  }

  addImageEquipmentOnForm(fileNameFromServer: string) {
    const defaultUrlForImage = `${baseUrl}/containers/images/download/${fileNameFromServer}`;
   
    this.formProduct.controls['image'].setValue(defaultUrlForImage);
  }


  uploadImageEquipment($event){
    const image = $event.target.files[0];
    console.log('Image send from user', image);

    const imageToSend = new FormData();
    imageToSend.append('image', image);

    this.crud.uploadImage(imageToSend, '/containers/images/upload').subscribe((response) =>{
      
      const nameFileFromServer = response.result.files.image[0].name;
      this.fileUploadName = nameFileFromServer;
      console.log(this.fileUploadName);

      this.addImageEquipmentOnForm(this.fileUploadName);
    }, error => {
      console.log(error);
    })
  }

}
