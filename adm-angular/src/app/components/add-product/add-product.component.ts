import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/product';
import { CrudService } from 'src/app/services/crud.service';
import { baseUrl } from './../../shared/baseUrl';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from './../../shared/category';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private crud: CrudService, private route: ActivatedRoute, private router: Router) {

  }

  modalIsOpen: boolean = false;

  formProduct: FormGroup;
  formCategory: FormGroup;
  product: Product = null;
  selectedId: string = null;
  isSuccess?: boolean = false;
  isError?: boolean = false;
  isSuccessModal?: boolean = false;
  isErrorModal?: boolean = false;
  errorMessageModal?: boolean = false;
  errorMessage: string = null;
  fileUploadName: string = null;
  categories: Category[] = [];

  destroy: ReplaySubject<boolean> = new ReplaySubject(1);


  ngOnInit(): void {
    this.mountForm();
    this.route.paramMap.subscribe(
      params => {
        if (params) {
          let id = params.get('id');

          if (id) {
            this.loadProductInfoToEdit(id);
          } else {
            return;
          }
        } else {
          console.log('No product to edit');
        }
      }
    );
    this.loadCategories();
  }


  mountForm() {
    this.formProduct = this.fb.group({
      name: [''],
      category: [''],
      price: [''],
      brand: [''],
      description: [''],
      image: ''
    });

    this.formCategory = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }

  loadCategories() {
    this.crud.getData('/categories').pipe(takeUntil(this.destroy)).subscribe((categoriesReceived) => {
      this.categories = categoriesReceived;
      this.isSuccessModal = true;
      this.isErrorModal = false;
    }, error => {
      this.isErrorModal = true;
      this.isSuccessModal = false;
      this.errorMessageModal = error;
      console.log(error);
    })
  }

  addCategory() {
    let category: Category = this.formCategory.value;
    this.crud.addData(category, '/categories').subscribe((response) => {
      this.isSuccessModal = true;
      this.isErrorModal = false;
      this.categories.push(category);
    }, error => {
      this.categories.pop();
      this.isErrorModal = true;
      this.isSuccessModal = false;
      this.errorMessageModal = error;
      console.log(error);
    })
  }

  deleteCategory(event, i) {

    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.value;

    let confirmAlert = confirm('Você deseja realmente deletar a categoria selecionada?');

    if (confirmAlert) {
      this.crud.deleteData('/categories', id).subscribe((response) => {
        console.log(response);
        this.isSuccessModal = true;
        this.isErrorModal = false;
        this.categories.splice(i, 1);
      }, error => {
        this.isErrorModal = true;
        this.isSuccessModal = false;
        this.errorMessageModal = error;
        console.log(error);
      });
    }
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

  sendFormToServer() {
    this.product = this.formProduct.value;
    this.crud.addData(this.product, '/products').subscribe((res) => {
      console.log(res);
      this.isError = false;
      this.isSuccess = true;
      alert('Produto cadastrado com sucesso');
      this.router.navigate(['home/listarProdutos']);
    }, error => {
      console.log(error);
      this.errorMessage = error;
    })
  }

  updateProductAndGoBackRoute(event) {
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

  cancelSendForm() {
    this.formProduct.reset();
  }

  addImageEquipmentOnForm(fileNameFromServer: string) {
    const defaultUrlForImage = `${baseUrl}/containers/images/download/${fileNameFromServer}`;

    this.formProduct.controls['image'].setValue(defaultUrlForImage);
  }

  toggleModal() {
    this.loadCategories();
    return this.modalIsOpen = !this.modalIsOpen;
  }


  uploadImageEquipment($event) {
    const image = $event.target.files[0];
    console.log('Image send from user', image);

    const imageToSend = new FormData();
    imageToSend.append('image', image);

    this.crud.uploadImage(imageToSend, '/containers/images/upload').subscribe((response) => {

      const nameFileFromServer = response.result.files.image[0].name;
      this.fileUploadName = nameFileFromServer;
      console.log(this.fileUploadName);

      this.addImageEquipmentOnForm(this.fileUploadName);
    }, error => {
      console.log(error);
    })
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
