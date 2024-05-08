import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../Service/Register.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  constructor(private fb:FormBuilder,private registerServ:RegisterService,private router:Router){}

  registerFom!:FormGroup;

  ngOnInit(): void {
    this.registerFom = this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })


  }

  onSubmit()
  {
    console.log(this.registerFom.value);
    if(this.registerFom.invalid)
    {
      alert('Please enter valid data')
      return;
    }
    
    this.registerServ.Register(this.registerFom.value).subscribe(data=>{
      console.log(data);
      if(data.value)
      {
        console.log('register Component',data.value.jwtToken);
        
        this.registerServ.setToken(data.value.jwtToken);
            
        this.router.navigate(['register2']);

        
      }

    });

  }

}
