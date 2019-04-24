import { SearchService } from './../../shared/search.service';
import { Sistema } from './sistema.model';
import { AlertService } from './../../shared/alert.service';
import { SistemaService } from './sistema.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {

  sistemaForm: FormGroup;
  displayPesquisaSistema = 0;
  searchTerm$ = new Subject<string>();
  resultsSearch: Sistema[];
  @ViewChild('pesquisa') pesquisa:ElementRef;
  queryParm:string;

  constructor(private sistemaService: SistemaService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private searchService: SearchService,
    private router: Router) {
    this.searchService.searchSistema(this.searchTerm$)
      .subscribe(results => {
        this.resultsSearch = results;
        this.displayPesquisaSistema = 1;
      })

  }

  ngOnInit() {
    this.sistemaForm = this.formBuilder.group({
      id: ['', []],
      nome: ['', [Validators.required]]
    });
  }
  criarSistema() {
    const novoSistema = this.sistemaForm.getRawValue() as Sistema;
    this.sistemaService.criarSistema(novoSistema).subscribe(() => { this.showNotification('top', 'right', 'success', 'Sistema criado com sucesso!') }, err => console.log(err));
    this.sistemaForm.reset();
  }
  showNotification(from: string, align: string, type: string, text: string) {
    this.alertService.showNotification(from, align, type, text);
  }
  backDashboard() {
    this.resultsSearch = null;
    this.displayPesquisaSistema = 0;
    this.router.navigate(['cruds']);
  }
  deletarSistema(id: number) {
    this.queryParm = this.pesquisa.nativeElement.value;
    console.log(this.queryParm);
    this.sistemaService.deletarSistema(id).subscribe(() => {
      this.showNotification('top', 'right', 'success', 'Sistema deletado com sucesso!')}, err => console.log(err))
  }


}
