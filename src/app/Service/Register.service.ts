import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { RegsiterRequest } from "../Model/register-request.model";
import { AddInfoRequest } from "../Model/add-info-request.model";
import { GeneralResponse } from "../Model/general-response.model";
import { RegisterResponse } from "../Model/register-response.model";
import { map, of, tap } from "rxjs";
import { User } from "../Model/user.model";
import { AllowAccessResponse } from "../Model/allow-access-response.model";
import { AddUserScaleRequest } from "../Model/add-userscale-request.model";
import { Scale } from "../Model/scale.model";



@Injectable({
    providedIn:'root'
})
export class RegisterService{

    private postRegisterRequest:string = `${environment.localhost}Authentication/Register`
    private postInfoRequest:string = `${environment.localhost}Authentication/AddUserInfo`
    private getAllowAccess:string = `${environment.localhost}Authentication/AllowAccess/`
    private postUserScale:string = `${environment.localhost}Authentication/AddUserScale`
    private getAllScales:string = `${environment.localhost}Authentication/GetAllScaleForUser/`
    private getSingleUser:string = `${environment.localhost}Authentication/GetSingleUser/`

    constructor(private http:HttpClient){
        let token = this.getToken();
        if(token != undefined && token != null)
        {
            console.log(token);
            
            this.AllowAccess().subscribe(data=>{
                console.log('after allow access',data);
                
            });

        }
    }

    registerFromData = new FormData();
    user!:User;

    setToken(token:string)
    {
        localStorage.setItem('Token',token);
    }

    getToken()
    {
        return localStorage.getItem('Token')
    }
    
    deleteToken()
    {
        localStorage.removeItem('Token');
    }

    Register(request:RegsiterRequest)
    {
        this.registerFromData.append('username',request.username);
        this.registerFromData.append('email',request.email);
        this.registerFromData.append('password',request.password);

        return this.http.post<GeneralResponse<RegisterResponse>>(this.postRegisterRequest,this.registerFromData);
    }
///////////////////////////////
    Addinfo(request:AddInfoRequest)
    {
        return this.http.post<GeneralResponse<any>>(this.postInfoRequest,request);
    }

    GetSingleUser()
    {
        return this.http.get<GeneralResponse<AddInfoRequest>>(this.getSingleUser+this.user.id)
    }

    AddUserScale(request:AddUserScaleRequest)
    {
        return this.http.post<GeneralResponse<null>>(this.postUserScale,request);
    }

    SetUser(data:any)
    {
        this.user = {id:data.userId,username:data.userName,role:data.role,email:data.email,token:data.token}
    }

    GetAllScalesForUser()
    {
        return this.http.get<GeneralResponse<Scale[]>>(this.getAllScales+this.user.id)
    }


///////////////////////////////////////
    AllowAccess()
    {
        return this.http.get<any>(this.getAllowAccess+this.getToken()).pipe(map(data=>{
            if(data)
            {
                this.SetUser(data)
            }
            return data;
        }))

    }
}