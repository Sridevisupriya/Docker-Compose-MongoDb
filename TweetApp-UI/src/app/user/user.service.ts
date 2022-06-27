import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "./user.model";
import { ViewUser } from "./view-user.model";

@Injectable({providedIn: 'root'})
export class UserService{

    constructor(private http: HttpClient){}

    userDetail = new Subject<ViewUser>();
    allUsers = new Subject<ViewUser[]>();

    getUsers(userId: string){
        this.http.get<ViewUser>('http://localhost:48897/api/v1.0/tweets/user/search/'+userId).subscribe((user) => {
            this.userDetail.next(user);
        });
    }

    getAllUsers(){
        this.http.get<ViewUser[]>('http://localhost:48897/api/v1.0/tweets/users/all').subscribe((users) => {
            this.allUsers.next(users);
        });
    }

    getUsersById(id : string){
        this.http.get<ViewUser[]>('http://localhost:48897/api/v1.0/tweets/users/search/'+id).subscribe((users) => {
            this.allUsers.next(users);
        });
    }

    updateProfile(user: ViewUser, userId: string){
        return this.http.put<boolean>('http://localhost:48897/api/v1.0/tweets/updateProfile/'+userId,
        {
            emailId : user.emailId,
            firstName: user.firstName,
            lastName: user.lastName,
            password : "password",
            confirmPassword : "password",            
            dateofbirth : user.dateOfBirth,
            gender : user.gender,
            securityQuestion : 2,
            securityAnswer : "red"
        }
        );
    }

}