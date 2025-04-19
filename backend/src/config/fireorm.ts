import { initialize, getRepository, BaseFirestoreRepository, IEntity } from 'fireorm';
import { firestore } from './firebase.js';
import { Firestore } from 'firebase-admin/firestore';

let isInitialized = false;

export const initFireORM = async (): Promise<Firestore> => {
  if (!isInitialized) {
    try {
      initialize(firestore);
      isInitialized = true;
      console.log('✅ FireORM initialized successfully');
    } catch (error) {
      console.error('❌ FireORM initialization failed:', error);
      throw new Error('Failed to initialize FireORM');
    }
  }
  return firestore;
};

export const getFireORMRepository = <T extends IEntity>(entity: new () => T): BaseFirestoreRepository<T> => {
  if (!isInitialized) {
    throw new Error('FireORM not initialized. Call initFireORM() first');
  }
  return getRepository(entity);
};