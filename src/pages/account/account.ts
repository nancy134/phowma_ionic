import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Account } from '../../providers/account';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
    providers: [Account]
})
export class AccountPage {
    public showRegister: boolean = false;
    public showSignIn: boolean = true;
    public signedIn: boolean = false;
    signin_params = {}
    register_params = {}
    constructor(public navCtrl: NavController, public navParams: NavParams, public account: Account) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccountPage');
    }
    signIn(){
        console.log("Sign In Clicked");
        this.account.signin().then(data => {
            console.log("data: "+JSON.stringify(data));
        });
    }

    onShowRegister(){
        console.log("Register");
        this.showRegister = true;
        this.showSignIn = false;
    }
    onShowSignIn(){
        console.log("Show Sign In");
        this.showRegister = false;
        this.showSignIn = true;
    }
}
