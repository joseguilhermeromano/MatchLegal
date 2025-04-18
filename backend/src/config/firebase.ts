import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = firebaseApp.firestore();

export { admin, firestore };
