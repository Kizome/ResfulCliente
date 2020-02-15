import { Usuario } from './Usuario';

export interface Grupo{
    id:string,
    nombre:string,
    usuarios?:Usuario[]
}