import { admin } from '../config/firebase.js';

export interface Message {
    from: 'user' | 'assistant';
    text: string;
    timestamp: admin.firestore.Timestamp;
}