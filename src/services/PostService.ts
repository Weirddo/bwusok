import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class PostService {
 
    constructor(private http:Http) {
 
    }
 
    getPosts() {

        var response = this.http.post('http://93.115.97.208/bwus/post/read.php',1).map(res=> res.json());
        console.log(response);
        //alert (response);
       return response;
    }    
}