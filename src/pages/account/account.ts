import { Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { App, NavController, NavParams, Tabs } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';
import { NetworkService } from '../../providers/network-service';
import { ContactService } from '../../providers/contact-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
    providers: [AccountService, ContactService, NetworkService]
})
export class AccountPage {
    public showRegister: boolean = false;
    public showSignIn: boolean = true;
    public showSignOut: boolean = false;
    public signedIn: boolean = false;
	public syncing: boolean = false;
    public email: any;
    tab: Tabs;
    
    register_params = {}
    signInForm: FormGroup;
    constructor(
        public navCtrl: NavController, 
        public platform: Platform,
        public navParams: NavParams, 
        public accountService: AccountService, 
        public networkService: NetworkService, 
        public contactService: ContactService, 
        public formBuilder: FormBuilder, 
        public appCtrl: App) {
            
        this.tab = this.navCtrl.parent;
        this.signInForm = formBuilder.group({
            email: ['',Validators.required],
            pass: ['',Validators.required]
        });        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccountPage');
    }
    ionViewWillEnter() {
        console.log("ionViewWillEnter()");
        this.platform.ready().then(() => {
            this.networkService.isSignedIn().then(data => {
                console.log("ionViewWillEnter - isSignedIn");
                console.log("data: "+data);
                this.email = data["response"]["data"]["email"];
                console.log("email: "+this.email);
                this.onShowSignOut();
            },
            err => {
                this.onShowSignIn();
            });
        });
    }
    signIn(){
        var bodyData = {};
        bodyData['email'] = this.signInForm.controls['email'].value;
        bodyData['password'] = this.signInForm.controls['pass'].value;

        var url = 'http://dev.phowma.com/api/v1/auth/sign_in';
        
        this.networkService.post(url, bodyData).then(
        data => {
            this.tab.select(1);
        },
        err => {
        });
    }

    onShowRegister(){
        this.showRegister = true;
        this.showSignIn = false;
        this.showSignOut = false;
    }
    onShowSignIn(){
        this.showRegister = false;
        this.showSignIn = true;
        this.showSignOut = false;
    }
    onShowSignOut(){
        this.showRegister = false;
        this.showSignIn = false;
        this.showSignOut = true;
    }
    sync(){
		this.syncing = true;
		this.contactService.sync().then(
		data => {
			this.syncing = false;
		},
		err => {
			this.syncing = false;
		});
	}
}
