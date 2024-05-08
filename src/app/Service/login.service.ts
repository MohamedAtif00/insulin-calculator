import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { LoginRequest } from "../Model/loginRequest.model";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})

export class LoginService{


    private postLoginRequest :string = `${environment.localhost}Authentication/Login`

    constructor(private http:HttpClient){}


    Login(request:LoginRequest)
    {
        return this.http.post<any>(this.postLoginRequest,request);
    }

}