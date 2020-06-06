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

  isError: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string = undefined;
  ngOnInit(): void {
    this.mountForm();
  }

  mountForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  sendFormToServer() {
    localStorage.clear();
    this.userData = this.formLogin.value;
    this.login.login('Users/login', this.userData).subscribe((response) => {
      this.isError = false;
      this.isSuccess = true;
      this.setTokenOnLocalStorage(response);
    }, error => {
      console.log(error);
      this.isSuccess = false;
      this.isError = true;
      this.errorMessage = error;
    })
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
