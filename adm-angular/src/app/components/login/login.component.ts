import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/user';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private login: LoginService, private router: Router) { }

  formLogin: FormGroup;
  userData: User;
  response: User;
  isError: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string = undefined;
  responseServer: User;
  ngOnInit(): void {
    this.mountForm();
  }

  mountForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
      realm: ['', [ Validators.required]]
    });
  }

  verifyUserAndAddTypeOnLoginData(username: string) {
    if(username.length !== 0){
      
      let isAdmin = username.substr(0,6);
      console.log(isAdmin);
      if(isAdmin !== 'admin:'){
        return this.formLogin.get('email').setValue(`client:${username}`);
      }else {
        return this.formLogin.get('email').setValue(`${username}`);
      }
    }
  }

  sendFormToServer() {
    localStorage.clear();
    
    let email = this.formLogin.get('email').value;
    
    this.verifyUserAndAddTypeOnLoginData(email);

    this.userData = this.formLogin.value;

    this.login.login('Users/login?include=user', this.userData).subscribe((response) => {
      if(response.user.realm === 'client'){
        return this.router.navigate(['/clientHome'])
      } 
      this.isError = false;
      this.isSuccess = true;
      this.setTokenOnLocalStorage(response);
      this.setRealmLocalStorage(response);
    }, error => {
      console.log(error);
      this.formLogin.get('email').setValue('seuemail@email.com');
      this.isSuccess = false;
      this.isError = true;
      this.errorMessage = error;
    })
  }

  setRealmLocalStorage(response){
    return localStorage.setItem('type', response.user.realm);
  }

  setTokenOnLocalStorage(response) {
    if(response.id){
      let token = response.id;
      localStorage.setItem('token', token);
      this.redirectUserToHome();
    } else {
      return;
    }
  }

  redirectUserToHome(){
    this.router.navigate(['home/info']);
  }

}
