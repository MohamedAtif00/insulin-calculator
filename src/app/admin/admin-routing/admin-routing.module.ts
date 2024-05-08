import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { BlogCreationComponent } from '../blog-creation/blog-creation.component';

const routes:Routes = [
  {path:'',component:BlogCreationComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AdminRoutingModule { }
