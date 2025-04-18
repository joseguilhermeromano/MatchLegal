import { firestore } from './firebase.js';
import { initialize } from 'fireorm';
import { Firestore } from 'firebase-admin/firestore';

let isInitialized = false;

export const initFireORM = (): Firestore => {
  try {
    if(!isInitialized){
        initialize(firestore);
        isInitialized = true;
    }
    return firestore;
  } catch (error: unknown) {
    console.error('❌ FireORM initialization failed:', error);
    throw error; 
  }
};