import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../providers/auth-service';

/*
  Generated class for the NetworkService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkService {
    public isSignedInFlag: boolean = false;
    

    constructor(public http: Http, public authService: AuthService, ) {
        console.log('NetworkService Constructor');
    }
    post(url, data) {
        
        var http = this.http;
        var authService = this.authService;
        var httpData = {};
        httpData["request"] = {}
        httpData["request"]["url"] = url;
        httpData["request"]["data"] = data;
        httpData["response"] = {};
        
        var auth = function(httpData){
            return new Promise(
                function(resolve, reject){
                    authService.getHeaders().then(
                    (authHeaders) => {
                        httpData["request"]["headers"] = authHeaders;
                        resolve(httpData);
                    },
                    (err) => {
                        var errObj = {};
                        errObj["error"] = {};
                        errObj["error"]["message"] = "Error getting auth headers";
                        reject(errObj);
                    });
                }
            );
        };
        var post = function (httpData) {
            return new Promise(
                function (resolve, reject) {
                    //httpData["request"]["headers"].append('Content-Type', 'application/x-www-form-urlencoded');
                    httpData["request"]["headers"].append('Content-Type', 'application/json');
                    console.log("http.post url: "+httpData["request"]["url"]);
                    console.log("http.post data: "+httpData["request"]["data"]);
                    var bodyData = { "ids" : [ "31", "32"]};
                    var strJson = JSON.stringify(bodyData);
                    http.post(httpData["request"]["url"],httpData["request"]["data"],{headers: httpData["request"]["headers"]})
                    //http.post(httpData["request"]["url"],strJson,{headers: httpData["request"]["headers"]})
                    //http.post(httpData["request"]["url"],'{"ids":["20","21","22","25","26","27","28","29","30","31","32"]}',{headers: httpData["request"]["headers"]})
                    .map(res => {
                        httpData["response"]["headers"] = res.headers;
                        httpData["response"]["status"] = res.status;
                        httpData["response"]["statusText"] = res.statusText;
                        // Need to check if json before conversion.  This happened when at public wifi
                        return res.json();
                    })
                    .subscribe(
                    data => {
                        httpData["response"]["data"] = data;
                        resolve(httpData);
                    },
                    err => {
                        var errObj = {};
                        errObj["error"] = {};
                        errObj["error"]["status"] = err.status;
                        errObj["error"]["statusText"] = err.statusText;
                        reject(errObj);
                    });
                }
            );
        };        
        var storeHeaders = function (httpData) {
            return new Promise(
                function (resolve, reject) {
                    if (httpData["response"]["headers"].get("access-token") != null){
                        authService.storeHeaders(httpData["response"]).then(abc => {
                            resolve(httpData["response"]["data"]);
                        });
                    } else {
                        resolve(httpData["response"]["data"]);
                    }
                }
            );
        };        
        return new Promise(
            function (resolve, reject) {
                auth(httpData)
                .then(post)
                .then(storeHeaders)
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (error) {
                    reject(error)
                });
            }
        );
    }
    get(url) {
        var http = this.http;
        var authService = this.authService;
        var httpData = {};
        httpData["request"] = {}
        httpData["request"]["url"] = url;
        httpData["response"] = {};
        
        var auth = function(httpData){
            return new Promise(
                function(resolve, reject){
                    authService.getHeaders().then(
                    (authHeaders) => {
                        httpData["request"]["headers"] = authHeaders;
                        resolve(httpData);
                    },
                    (err) => {
                        var errObj = {};
                        errObj["error"] = {};
                        errObj["error"]["message"] = "Error getting auth headers";
                        reject(errObj);
                    });
                }
            );
        };
        var get = function (httpData) {
            return new Promise(
                function (resolve, reject) {
                    http.get(httpData["request"]["url"],{headers: httpData["request"]["headers"]})
                    .map(res => {
                        httpData["response"]["headers"] = res.headers;
                        httpData["response"]["status"] = res.status;
                        httpData["response"]["statusText"] = res.statusText;
                        console.log("headres:status"+httpData["response"]["headers"].get("Status"));
                        console.log("headres:access-token"+httpData["response"]["headers"].get("access-token"));
                        return res.json();
                    })
                    .subscribe(
                    data => {
                        httpData["response"]["data"] = data;
                        resolve(httpData);
                    },
                    err => {
                        var errObj = {};
                        errObj["error"] = {};
                        errObj["error"]["status"] = err.status;
                        errObj["error"]["statusText"] = err.statusText;
                        console.log("err Object.prototype.toString: "+Object.prototype.toString.call(err));
                        console.log("err Object.prototype.valueOf: "+Object.prototype.valueOf.call(err));
                        console.log("err.type: "+err.type);
                        console.log("err.ok: "+err.ok);
                        console.log("err.url: "+err.url);
                        console.log("err.status: "+err.status);
                        console.log("err.statusText: "+err.statusText);
                        console.log("err.bytesLoaded: "+err.bytesLoaded);
                        console.log("err.totalBytes: "+err.totalBytes);
                        console.log("err.headers: "+err.headers);
                        console.log("err.toString: "+err.toString());
                        //console.log("err type: "+Object.prototype.toSource.call(err));
                        //console.log("err json.stringify: "+JSON.stringify(err));
                        //var errJson = err.json();
                        //errObj["error"]["message"] = errJson.errors[0];
                        reject(errObj);
                    });
                }
            );
        };        
        var storeHeaders = function (httpData) {
            return new Promise(
                function (resolve, reject) {
                    if (httpData["response"]["headers"].get("access-token") != null){
                        authService.storeHeaders(httpData["response"]).then(abc => {
                            //resolve(httpData["response"]["data"]);
                            resolve(httpData);
                        });
                    } else {
                        //resolve(httpData["response"]["data"]);
                        resolve(httpData);
                    }
                }
            );
        };        
        return new Promise(
            function (resolve, reject) {
                auth(httpData)
                .then(get)
                .then(storeHeaders)
                .then(function (httpData) {
                    resolve(httpData);
                })
                .catch(function (error) {
                    reject(error)
                });
            }
        );
    }
    isSignedIn() {
        var a = this;
        return new Promise(
            function (resolve, reject) {
                if (!a.isSignedInFlag){
                    var url = 'http://dev.phowma.com/api/v1/contacts/check';
        
                    a.get(url).then(
                    data => {
						console.log("check data");
                        a.isSignedInFlag = true;
                        resolve(data);
                    },
                    err => {
						console.log("check error");
                        reject(err);
                    });
                }
            }
        );
    }

}
