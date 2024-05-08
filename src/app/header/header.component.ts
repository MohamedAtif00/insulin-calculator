import { Component } from '@angular/core';
import { RegisterService } from '../Service/Register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(public authServ:RegisterService){}


  signOut()
  {
    this.authServ.deleteToken()
  }



}
