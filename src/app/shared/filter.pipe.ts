import { PipeTransform, Pipe } from "@angular/core";
import { Tarefa } from "app/todo/tarefa/tarefa.model";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(tarefa: Tarefa[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        if(descriptionQuery) {
            return tarefa.filter(photo => 
                photo.descricao.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return tarefa;
        }
    }

}