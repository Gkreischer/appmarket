import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/product';
import { ReplaySubject } from 'rxjs';
import { MarketInfo } from 'src/app/shared/marketInfo';

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
  isMarketInfo: boolean = false;
  idMarket: string;
  destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  marketInfo: MarketInfo = undefined;
  ngOnInit(): void {
    this.getProducts();
    this.getMarketInfo();
  } 

  getMarketInfo() {
    this.crud.getData('/marketInfos').subscribe((response) => {
      if (response.length !== 0) {
        this.isMarketInfo = true;
        this.marketInfo = response[0];
        
      } else {
        alert('Cadastre as informações da loja.');
      }
    }, error => {
      console.log(error);
    });
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
