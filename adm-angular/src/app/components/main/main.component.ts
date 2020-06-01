import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private login: LoginService) { }

  ngOnInit(): void {
  }

  token: string = undefined;

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    const token = this.getToken();

    this.login.logout('/Users/logout', token).subscribe((response) => {

      this.router.navigate(['login']);

      localStorage.clear();
    }, error => {
      console.log(error);
    });

  }

}
