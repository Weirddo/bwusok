import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class MessageService {
 
    constructor(private http:Http) {
 
    }
 
    getMessages() {

        var response = this.http.get('http://93.115.97.208/bwus/message/read.php').map(res => res.json());
        console.log(response);
       return response;
    }    
}