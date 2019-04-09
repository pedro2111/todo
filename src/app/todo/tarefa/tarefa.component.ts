import { AlertService } from './../../shared/alert.service';
import { Sistema } from './../sistema/sistema.model';
import { Component, OnInit } from '@angular/core';
import { TarefaService } from './tarefa.service';
import { Tarefa } from './tarefa.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {

  tarefas$: Tarefa[];
  tarefasDone$: Tarefa[];
  sistemas$: Sistema[];
  displaySistema: number = 1;
  tarefaForm: FormGroup;

  constructor(private tarefaService: TarefaService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

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

  trocaDisplay(id: number) {
    this.displaySistema = id;
  }
  criarTarefa() {
    const novaTarefa = this.tarefaForm.getRawValue() as Tarefa;
    this.tarefaService.criarTarefa(novaTarefa).subscribe(() => this.showNotification('top','right','success','Tarefa Adicionada com sucesso!'), err => console.log(err));
    this.getAllTarefas();
    this.tarefaForm.reset();
  }
  deletarTarefa(id: number) {
    this.tarefaService.deletarTarefa(id).subscribe(() => this.showNotification('top','right','success','Tarefa removida com sucesso!'),err => console.log(err));
    this.getAllTarefas();
    this.tarefaForm.reset();
  }
  finalizarTarefa(id: number) {
    this.tarefaService.finalizarTarefa(id).subscribe(() =>this.showNotification('top','right','success','Tarefa finalizada com sucesso!'),err => console.log(err));
    this.getAllTarefas();
    this.getDoneTarefas();
  }
  showNotification(from: string, align: string,type:string, text: string) {
    this.alertService.showNotification(from,align,type,text);
  }

}