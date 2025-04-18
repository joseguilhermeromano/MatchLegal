import { firestore, admin } from '../config/firebase.js';
import { Message } from '../interfaces/message.interface.js';
import { StepData } from '../interfaces/stepData.interface.js';
import { SessionData } from '../interfaces/sessionData.interface.js';

export class AssistantModel {
  sessionId: string;
  userRef: admin.firestore.DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>;
  messagesRef: admin.firestore.CollectionReference<admin.firestore.DocumentData, admin.firestore.DocumentData>;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.userRef = firestore.collection('conversations').doc(sessionId);
    this.messagesRef = this.userRef.collection('messages');
  }

  async getSession(): Promise<SessionData> {
    const doc = await this.userRef.get();
    return doc.exists ? (doc.data() as SessionData) : { currentStep: 'start', data: {} };
  }

  async saveSession(currentStep: string, data: StepData): Promise<void> {
    await this.userRef.set({
      currentStep,
      data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  async addMessage(from: 'user' | 'assistant', text: string): Promise<void> {
    await this.messagesRef.add({
      from,
      text,
      timestamp: new Date(),
    });
  }

  async getMessages(): Promise<Message[]> {
    const snapshot = await this.messagesRef.orderBy('timestamp', 'asc').get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        from: data.from,
        text: data.text, 
        timestamp: data.timestamp.toDate(), 
      };
    });
  }
}
