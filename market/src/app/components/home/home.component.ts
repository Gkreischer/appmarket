import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { MarketInfo } from 'src/app/shared/marketInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private crud: CrudService) { }

  isNavbarOpen: boolean = false;
  isMarketInfo: boolean = false;
  marketInfo: MarketInfo = undefined;
  ngOnInit(): void {
    this.getMarketInfo();
  }

  getMarketInfo() {
    this.crud.getData('/marketInfos').subscribe((response) => {
      if (response.length !== 0) {
        this.isMarketInfo = true;
        this.marketInfo = response[0];
        
      } else {
        alert('Cadastre as informações da loja na administração.');
      }
    }, error => {
      console.log(error);
    });
  }

  toggleNavbar() {
    return this.isNavbarOpen = !this.isNavbarOpen;
  }
}
