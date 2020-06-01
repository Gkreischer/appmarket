import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './login/login.component'

import { AuthInterceptor } from './inteceptors/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ErrorComponent,
    AddProductComponent,
    ListProductComponent,
    InfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    LoginService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
