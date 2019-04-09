import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TarefaComponent } from "./tarefa.component";
import { NotificationsComponent } from 'app/notifications/notifications.component';

@NgModule({
    declarations: [TarefaComponent,NotificationsComponent],
    exports:[TarefaComponent,NotificationsComponent],
    imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        FormsModule]

})
export class TarefaModule{

}