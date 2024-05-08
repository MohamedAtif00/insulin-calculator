import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../Service/Register.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  constructor(private loginServ:LoginService,private fb:FormBuilder,private registerServ:RegisterService,private router:Router){}
  loginForm!:FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit(){
    console.log(this.loginForm);
    
    if(this.loginForm.invalid)
    {
      alert('Please enter valid data')
      return
    }

    this.loginServ.Login(this.loginForm.value).subscribe(data=>{
      console.log(data);
      this.registerServ.setToken(data.value.jwtToken)
      this.registerServ.SetUser(data.value);
      
      this.router.navigate([''])
    });
  }



}
