export interface Tarefa {
    id: number,
    id_sistema: number,
    id_cat: number,
    nome: string,
    descricao: string,
    status: number,
    created_at: Date,
    updated_at: Date
}