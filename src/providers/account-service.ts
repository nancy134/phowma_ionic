import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../providers/auth-service';

/*
  Generated class for the Account provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountService {
    public data: any;
    public myheaders: any;
    
    constructor(public http: Http, public authService: AuthService) {
        console.log('Hello Account Provider');
        this.data = null;
    }
    isSignedIn(){
        return false;
    }
}
