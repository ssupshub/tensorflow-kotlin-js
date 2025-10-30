/**
 * TypeScript definitions for TensorFlow.js integration
 */

import * as tf from '@tensorflow/tfjs';

export interface ModelConfig {
    modelPath: string;
    inputShape: number[];
    outputClasses: number;
}

export interface PredictionResult {
    predictedClass: number;
    confidence: number;
    probabilities: Float32Array;
}

export interface InputData {
    values: number[];
}

export type ModelLoadCallback = (success: boolean, error?: Error) => void;
export type PredictionCallback = (result: PredictionResult | null, error?: Error) => void;

declare global {
    interface Window {
        tf: typeof tf;
    }
}