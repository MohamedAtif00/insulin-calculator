import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalcComponent } from './calc/calc.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { ScaleTableComponent } from './scale-table/scale-table.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'calc',component:CalcComponent},
  {path:'calc-table',component:ScaleTableComponent},
  {path:'register',component:RegisterComponent},
  {path:'register2',component:RegisterInfoComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
