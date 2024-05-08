import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../Service/Register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit{

  constructor(private fb:FormBuilder,private registerServ:RegisterService,private router:Router){}
  registerForm!:FormGroup;

  ngOnInit(): void {

    if(this.registerServ.getToken())
    {
      this.registerServ.AllowAccess().subscribe(data=>{
        console.log(data);
        this.registerServ.user = {id:data.userId,username:data.username,email:data.email,role:data.role,token:data.token}

        console.log('user',this.registerServ.user);


      })

    }

    this.registerForm = this.fb.group({
        TDD:['',Validators.required],
        ICR:['',Validators.required],
        RargetBloodSugerLevel:['',Validators.required],
        correctionFactor:['',Validators.required]
    })

  }

  onSubmit()
  {
    console.log(this.registerForm.value);
    if(this.registerForm.invalid)
    {
      alert('Please enter valid data')
      return;
    }
    
    console.log(this.registerServ.user);
    
    this.registerServ.Addinfo({userId:this.registerServ.user.id,
                              username:this.registerServ.user.username,
                              tDD:this.registerForm.value.TDD,
                              iCR:this.registerForm.value.ICR,
                              targetBloodSugarLevel:this.registerForm.value.RargetBloodSugerLevel,
                              correctionFactor:this.registerForm.value.correctionFactor}).subscribe(data=>{
      console.log(data);
      if(data.isSuccess)
      {
        this.router.navigate(['']);
      }
      

    });

  }


}
