/**
 * ModelManager - Handles TensorFlow.js model loading and predictions
 */

import * as tf from '@tensorflow/tfjs';
import type { 
    ModelConfig, 
    PredictionResult, 
    ModelLoadCallback, 
    PredictionCallback 
} from '../types/tensorflow';

export class ModelManager {
    private model: tf.LayersModel | null = null;
    private config: ModelConfig;
    private isLoading: boolean = false;

    constructor(config: ModelConfig) {
        this.config = config;
    }

    /**
     * Load the TensorFlow.js model
     */
    public async loadModel(callback: ModelLoadCallback): Promise<void> {
        if (this.isLoading) {
            console.warn('Model is already being loaded');
            return;
        }

        this.isLoading = true;
        console.log(`🔄 Loading model from: ${this.config.modelPath}`);

        try {
            this.model = await tf.loadLayersModel(this.config.modelPath);
            console.log('✅ Model loaded successfully');
            console.log('📊 Model details:', {
                inputs: this.model.inputs.map(i => i.shape),
                outputs: this.model.outputs.map(o => o.shape),
            });
            
            this.isLoading = false;
            callback(true);
        } catch (error) {
            console.error('❌ Error loading model:', error);
            this.isLoading = false;
            callback(false, error as Error);
        }
    }

    /**
     * Make a prediction using the loaded model
     */
    public async predict(input: number[]): Promise<PredictionResult | null> {
        if (!this.model) {
            console.error('⚠️ Model not loaded!');
            return null;
        }

        if (input.length !== this.config.inputShape[0]) {
            console.error(
                `❌ Invalid input size. Expected ${this.config.inputShape[0]}, got ${input.length}`
            );
            return null;
        }

        console.log('🔮 Making prediction with input:', input);

        return tf.tidy(() => {
            // Create input tensor with shape [1, inputSize]
            const inputTensor = tf.tensor2d([input], [1, this.config.inputShape[0]]);
            
            // Make prediction
            const prediction = this.model!.predict(inputTensor) as tf.Tensor;
            
            // Get probabilities
            const probabilities = prediction.dataSync() as Float32Array;
            
            // Find predicted class
            let maxIndex = 0;
            let maxValue = probabilities[0];
            
            for (let i = 1; i < probabilities.length; i++) {
                if (probabilities[i] > maxValue) {
                    maxValue = probabilities[i];
                    maxIndex = i;
                }
            }

            const result: PredictionResult = {
                predictedClass: maxIndex,
                confidence: maxValue,
                probabilities: probabilities
            };

            console.log('✅ Prediction result:', result);
            return result;
        });
    }

    /**
     * Check if model is loaded
     */
    public isModelLoaded(): boolean {
        return this.model !== null;
    }

    /**
     * Get model information
     */
    public getModelInfo(): string {
        if (!this.model) {
            return 'Model not loaded';
        }

        const inputShape = this.model.inputs[0].shape;
        const outputShape = this.model.outputs[0].shape;
        
        return `Model loaded - Input: ${inputShape}, Output: ${outputShape}`;
    }

    /**
     * Dispose of the model and free memory
     */
    public dispose(): void {
        if (this.model) {
            this.model.dispose();
            this.model = null;
            console.log('🗑️ Model disposed');
        }
    }
}