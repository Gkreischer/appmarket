import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { InfoComponent } from './components/info/info.component';


const routes: Routes = [
  { 
    path: 'home', component: MainComponent ,
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
    ]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  { 
    path: '**', component: ErrorComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
