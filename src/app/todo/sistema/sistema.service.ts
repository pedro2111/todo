import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Sistema } from './sistema.model';

const API = 'http://localhost:4200';

@Injectable({
    providedIn:'root'
})

export class SistemaService{

    constructor(private http:HttpClient){}

    criarSistema(sistema:Sistema){
        return this.http.post(API + '/api/sistema',sistema);
    }
    deletarSistema(id:number){
        return this.http.delete(API + '/api/sistema/' + id);
    }


}