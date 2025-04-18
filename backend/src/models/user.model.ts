import { Collection } from 'fireorm';

@Collection('users')
export class User {
  id: string;
  name: string;
  location: string;
  areaOfInterest: string;
}
