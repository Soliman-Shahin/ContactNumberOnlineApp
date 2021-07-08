import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username : new FormControl(''),
        password: new FormControl('')
      }
    );
  }

}
