import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadService {
    constructor(private http: HttpClient){}

    uploadFile(formData: FormData){    
        this.http.post('http://localhost:3000/upload', formData, {
            reportProgress: true, 
            observe: 'events'
        })
        .subscribe(event => {
            if(event.type == HttpEventType.UploadProgress){
                console.log('upload progress: ' + Math.round( event.loaded / event.total * 100) + '%')
            }
        })
    }
}