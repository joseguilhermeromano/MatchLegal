import { Collection } from 'fireorm';

@Collection('users')
export class User {
  id: string;
  nome: string;
  localizacao: string;
  areaDeInteresse: string;
}
