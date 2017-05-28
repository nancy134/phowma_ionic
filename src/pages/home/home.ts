import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    districtForm: FormGroup;
    constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder){
        console.log("HomePage:constructor");
    
        this.districtForm = formBuilder.group({
            address: ['',Validators.required],
            city: ['',Validators.required],
            state: ['',Validators.required],
            zip: ['',Validators.required]
        });        
    }
    findDistrict(){
        console.log("Find Clicked");
        console.log("address: "+this.districtForm.controls['address'].value);
        console.log("city: "+this.districtForm.controls['city'].value);
        console.log("state: "+this.districtForm.controls['state'].value);
        console.log("zip: "+this.districtForm.controls['zip'].value);
    }

}
