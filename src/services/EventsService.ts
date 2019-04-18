import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class EventsService {
 
    constructor(private http:Http) {
 
    }
 
    getEvents() {

        var response = this.http.get('http://93.115.97.208/bwus/events/read.php').map(res => res.json());
        console.log(response);
       return response;
    }    
}