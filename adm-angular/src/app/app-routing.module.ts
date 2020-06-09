import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MarketconfigComponent } from './components/marketconfig/marketconfig.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  { 
    path: 'home', component: MainComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'addProduto',
        component: AddProductComponent
      },
      {
        path: 'addProduto/:id',
        component: AddProductComponent
      },
      {
        path: 'listarProdutos',
        component: ListProductComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'marketconfig',
        component: MarketconfigComponent
      }
    ]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  { 
    path: '**', component: ErrorComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
