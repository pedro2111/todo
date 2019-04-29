import { SearchService } from './../../shared/search.service';
import { AlertService } from './../../shared/alert.service';
import { Sistema } from './../sistema/sistema.model';
import { Component, OnInit, Input } from '@angular/core';
import { TarefaService } from './tarefa.service';
import { Tarefa } from './tarefa.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss'],
  providers:[SearchService]
})
export class TarefaComponent implements OnInit {

  @Input() tarefas$: Tarefa[];
  tarefasDone$: Tarefa[];
  tarefaSistema$: Tarefa[];
  sistemas$: Sistema[];
  displaySistema: number = 1;
  displayPesquisa: number = 0;
  tarefaForm: FormGroup;
  searchTerm$ = new Subject<string>();
  resultsSearch: Tarefa[];
  filtro:string;

  constructor(private tarefaService: TarefaService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private searchService: SearchService,
    private router: Router) {
      this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.displayPesquisa = 1;
        this.resultsSearch = results;        
      })
     }

  ngOnInit() {
    this.tarefaForm = this.formBuilder.group({
      id_sistema: ['', []],
      id_cat: ['', []],
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      status: ['', []]
    });
    this.getAllTarefas();
    this.getAllSistemas();
    this.getDoneTarefas();
    this.getTarefaSistema();
  }

  getAllTarefas() {
    this.tarefaService.getAllTarefas()
      .subscribe(res => this.tarefas$ = res);
  }
  getDoneTarefas() {
    this.tarefaService.getDoneTarefas()
      .subscribe(res => this.tarefasDone$ = res);
  }

  getAllSistemas() {
    this.tarefaService.getAllSistemas()
      .subscribe(res => this.sistemas$ = res)
  }
  getTarefaSistema(){
    this.tarefaService.getTarefaSistema()
    .subscribe(res => this.tarefaSistema$ = res)
  }

  trocaDisplay(id: number) {
    this.displaySistema = id;
  }
  criarTarefa() {
    const novaTarefa = this.tarefaForm.getRawValue() as Tarefa;    
    this.tarefaService.criarTarefa(novaTarefa).subscribe(() => 
    {this.showNotification('top','right','success','Tarefa Adicionada com sucesso!'),this.getAllTarefas(),this.getTarefaSistema()}, err => console.log(err));
    this.tarefaForm.reset();
  }
  deletarTarefa(id: number) {
    this.tarefaService.deletarTarefa(id).subscribe(() => 
    {this.showNotification('top','right','success','Tarefa removida com sucesso!'),this.getAllTarefas(),this.getDoneTarefas(),this.getTarefaSistema()},err => console.log(err));
    this.tarefaForm.reset();
  }
  finalizarTarefa(id: number) {
    this.tarefaService.finalizarTarefa(id).subscribe(() =>
    {this.showNotification('top','right','success','Tarefa finalizada com sucesso!'),this.getAllTarefas(),this.getDoneTarefas(),this.getTarefaSistema()},err => console.log(err));
  }
  showNotification(from: string, align: string,type:string, text: string) {
    this.alertService.showNotification(from,align,type,text);
  }
  backDashboard(){
    this.resultsSearch = null;
    this.displayPesquisa = 0;
    this.router.navigate(['']);
  }

}
