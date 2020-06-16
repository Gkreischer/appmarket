import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/shared/register';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private crud: CrudService, private router: Router) { }

  formRegister: FormGroup;
  registerData: Register;
  isErrorPassword: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string;
  ngOnInit(): void {
    this.mountForm();
  }

  mountForm() {
    this.formRegister = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      realm: ['client']
    });
  }

  sendForm() {

    let passwordOne = this.formRegister.get('password').value;
    let passwordTwo = this.formRegister.get('confirmPassword').value;

    if (passwordOne === passwordTwo) {
      this.isErrorPassword = false;
      this.formRegister.get('confirmPassword').setValue('confirmed');
      this.registerData = this.formRegister.value;

      this.crud.addData(this.registerData, '/Users').subscribe((response) => {
        console.log(response);
        this.isError = false;
        this.isSuccess = true;
        this.router.navigate(['/login']);
      }, error => {
        this.isError = true;
        this.isSuccess = false;
        this.errorMessage = error;
      })

    } else {
      alert('As senhas não são iguais');
      this.isErrorPassword = true;
    }
  }

  backToLoginMenu() {
    this.router.navigate(['/login']);
  }
}
