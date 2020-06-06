import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarketInfo } from 'src/app/shared/marketInfo';
import { baseUrl } from 'src/app/shared/baseUrl';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-marketconfig',
  templateUrl: './marketconfig.component.html',
  styleUrls: ['./marketconfig.component.scss']
})
export class MarketconfigComponent implements OnInit {

  constructor(private fb: FormBuilder, private crud: CrudService) { }

  formInfoMarket: FormGroup = undefined;
  infoMarket: MarketInfo = undefined;
  fileUploadName: string = null;
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string;
  isMarketInfo: boolean = false;
  idMarket: string;
  ngOnInit(): void {
    this.mountForm();
    this.getMarketInfo();
  }

  getMarketInfo() {
    this.crud.getData('/marketInfos').subscribe((response) => {
      if (response.length !== 0) {
        this.isMarketInfo = true;
        const { id } = response[0];
        this.idMarket = id;
        this.formInfoMarket.patchValue(response[0]);
      } else {
        alert('Cadastre as informações da loja.');
      }
    }, error => {
      console.log(error);
    });
  }

  updateMarketInfo() {
    this.infoMarket = this.formInfoMarket.value;
    this.crud.updateData(this.idMarket, this.infoMarket ,'/marketInfos').subscribe((response) => {
      this.isSuccess = true;
    }, error => {
      console.log(error);
      this.isError = true;
      this.isSuccess = false;
      this.errorMessage = error;
    });
  }

  mountForm() {
    this.formInfoMarket = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      tel: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      zipcode: ['', [Validators.required, Validators.minLength(4)]],
      district: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(10)]],
      logoImg: ['']
    });
  }

  sendForm() {
    this.infoMarket = this.formInfoMarket.value;

    this.crud.addData(this.infoMarket, '/marketInfos').subscribe((response) => {
      this.isSuccess = true;
    }, error => {
      console.log(error);
      this.isError = true;
      this.isSuccess = false;
      this.errorMessage = error;
    });
  }

  addImageEquipmentOnForm(fileNameFromServer: string) {
    const defaultUrlForImage = `${baseUrl}/containers/images/download/${fileNameFromServer}`;

    this.formInfoMarket.controls['logoImg'].setValue(defaultUrlForImage);
  }

  uploadLogoImage($event) {
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

}
