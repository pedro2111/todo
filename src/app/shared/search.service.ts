import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefa } from 'app/todo/tarefa/tarefa.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

const API = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  
  constructor(private http:HttpClient) { }

  search(terms: Observable<string>){
    return terms.debounceTime(10)
    .distinctUntilChanged()
    .switchMap(term => this.searchTarefa(term));
  }

  searchTarefa(term){
    return this.http.get<Tarefa[]>(API + '/api/tarefa/search/' + term );
  }
}
