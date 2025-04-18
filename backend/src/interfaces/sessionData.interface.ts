import { StepData } from './stepData.interface.js';

export interface SessionData {
    currentStep: string;
    data: StepData;
}