import { Injectable } from "@angular/core";
import { Tarefa } from "./tarefa.model";

import { HttpClient } from "@angular/common/http";
import { Sistema } from "../sistema/sistema.model";

const API = 'http://localhost:4200';

@Injectable({
    providedIn:"root"
})

export class TarefaService {

    constructor(private http: HttpClient){}

    getAllTarefas(){
        return this.http.get<Tarefa[]>(API + '/api/tarefa');
    }
    getDoneTarefas(){
        return this.http.get<Tarefa[]>(API + '/api/tarefadone');
    }
    getAllSistemas(){
        return this.http.get<Sistema[]>(API + '/api/sistema');
    }
    getTarefaSistema(){
        return this.http.get<Tarefa[]>(API + '/api/tarefasistema');
    }
    criarTarefa(tarefa:Tarefa){
        return this.http.post(API + '/api/tarefa', tarefa);
    }
    deletarTarefa(id:number){
        return this.http.delete(API + '/api/tarefa/' + id);
    }
    finalizarTarefa(id:number){
        return this.http.get(API + '/api/tarefa/done/' + id);
    }

}