import { Grupo } from './Grupo';
import { Puntuacion } from './Puntuacion';

export interface Usuario{
    id:string,
    nick:string,
    grupos?:Grupo[],
    puntuaciones:Puntuacion[],
    estado:string
}