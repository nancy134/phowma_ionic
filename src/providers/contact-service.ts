import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../providers/auth-service';
import { NetworkService } from '../providers/network-service';
import { Contacts, ContactFindOptions, ContactFieldType} from "ionic-native";

/*
  Generated class for the ContactService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactService {

    constructor(public http: Http, public authService: AuthService, public networkService: NetworkService) {
        console.log('ContactService constructor');
    }
    contacts(url) {
        var networkService = this.networkService;
        return new Promise(
            function (resolve, reject) {
                
                networkService.get(url).then(
                data => {
                    resolve(data);
                },
                err => {
                    reject(err);
                });
            }
        )
    }
    all() {
		console.log("contact-service.all");
        var ids = [];
        var getContactIds = new Promise(
            function (resolve, reject) {
				console.log("getcontactids");
                const options = new ContactFindOptions();
                options.filter = '';
                options.multiple = true;
                options.hasPhoneNumber = false;
                const desiredFields: ContactFieldType[] = ['id'];
                options.desiredFields = desiredFields; 
                const fields: ContactFieldType[] = ['id'];
                Contacts.find(fields, options).then(
                contacts => {
					console.log("contact.find success");
                    for (let i=0; i<contacts.length; i++){
                        ids.push(contacts[i].id);
                    }
                    resolve(ids);
                },
                error => {
					console.log("contact.find error"+error);
                    reject('getContact error');
                });
            }
        );
        //var as = this.authService;
        var networkService = this.networkService;
        //var h = this.http;
        var allPost = function (ids) {
            return new Promise(
                function (resolve, reject) {
					console.log("allpost");
                    var bodyData = {};
                    bodyData['ids'] = [];
                    for (let i=0; i<ids.length; i++){
                        bodyData['ids'].push(ids[i]);
                    }
                    var data = JSON.stringify(bodyData);
                    console.log("phone_ids: "+data);
                    var url = 'http://dev.phowma.com/api/v1/contacts/all';
        
                    networkService.post(url, bodyData).then(
                    data => {
                        //this.tab.select(1);
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    });
                }
            );
        };        
        
        return new Promise(
            function (resolve, reject) {
                getContactIds
                .then(allPost) // chain it here
                .then(function (fulfilled) {
                    resolve(fulfilled);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    }
    /*
	public syncAll(){
        var ids = [];
    	console.log("syncAll()");
        const options = new ContactFindOptions();
        options.filter = '';
        options.multiple = true;
        options.hasPhoneNumber = false;
        const desiredFields: ContactFieldType[] = ['id'];
        options.desiredFields = desiredFields; 
        const fields: ContactFieldType[] = ['id'];
        Contacts.find(fields, options).then(
        contacts => {
            console.log("syncAll() contact.find success");
            for (let i=0; i<contacts.length; i++){
                ids.push(contacts[i].id);
            }
			this.sync(ids);
        },
        error => {
			console.log("syncAll() contact.find error"+error);
        });
	}
	*/
    public sync(){
		console.log("sync()");
		
        var ids = [];
        var getContactIds = new Promise(
            function (resolve, reject) {
				console.log("getcontactids");
                const options = new ContactFindOptions();
                options.filter = '';
                options.multiple = true;
                options.hasPhoneNumber = false;
                const desiredFields: ContactFieldType[] = ['id'];
                options.desiredFields = desiredFields; 
                const fields: ContactFieldType[] = ['id'];
                Contacts.find(fields, options).then(
                contacts => {
					console.log("contact.find success");
                    for (let i=0; i<contacts.length; i++){
                        ids.push(contacts[i].id);
                    }
                    resolve(ids);
                },
                error => {
					console.log("contact.find error"+error);
                    reject('getContact error');
                });
            }
        );
		
		var networkService = this.networkService;
        var postToServer = function(e) {
			return new Promise(
				function (resolve, reject) {
					console.log("sync() postToServer()");
					const options = new ContactFindOptions();
					options.filter = e;
					options.multiple = false;
					options.hasPhoneNumber = false;
					const desiredFields: ContactFieldType[] = ['id', 'name', 'addresses', 'phoneNumbers'];
					options.desiredFields = desiredFields; 
					const fields: ContactFieldType[] = ['id'];
					Contacts.find(fields, options).then(contacts => {
						console.log("sync() contacts.find()");
						var bodyData = {};
						bodyData['phone_id'] = contacts[0].id;
						console.log("sync() bodyData: "+JSON.stringify(bodyData));
						var url = 'http://dev.phowma.com/api/v1/contacts/test';
						networkService.post(url, bodyData).then(data => {
							console.log("sync() networkswervice.post() data: "+JSON.stringify(data));
							resolve(data);
						},
						err => {
							console.log("sync() networkswervice.post() error");
							reject(err);
						});
					},
					err => {
						reject("Error");
					});
				}
			);
		}

        var abcd = [];
        var workMyCollection = (ids) => {
            return ids.reduce((promise, item) => {
				console.log("ids.reduce() 1");
                return promise.then((result) => {
					console.log("ids.reduce() 2");
                    return postToServer(item).then(result => abcd.push(result));
                })
                .catch(console.error);
            }, Promise.resolve());
        }
		
		
		/*
        return new Promise(
            function (resolve, reject) {
				workMyCollection(phone_ids).then(() => {
					console.log("workMyCollection()");
					resolve(abcd);
				});
			}
		);
		*/
        return new Promise(
            function (resolve, reject) {
				getContactIds
				.then(workMyCollection)
				.then(() => {
					console.log("workMyCollection()");
					resolve(abcd);
				});
			}
		);
    }
}


