/**
 * UIManager - Handles all UI rendering and interactions
 */

import { ModelManager } from '../core/ModelManager';
import type { PredictionResult } from '../types/tensorflow';

export class UIManager {
    private modelManager: ModelManager;
    private predictButton: HTMLButtonElement | null = null;
    private resultDiv: HTMLDivElement | null = null;
    private statusDiv: HTMLDivElement | null = null;
    private inputFields: HTMLInputElement[] = [];

    constructor(modelManager: ModelManager) {
        this.modelManager = modelManager;
    }

    /**
     * Render the main UI
     */
    public render(): void {
        const container = document.getElementById('app');
        
        if (!container) {
            console.error('❌ App container not found!');
            return;
        }

        container.innerHTML = this.getHTML();
        this.setupEventListeners();
        
        // Store references
        this.predictButton = document.getElementById('predictBtn') as HTMLButtonElement;
        this.resultDiv = document.getElementById('result') as HTMLDivElement;
        this.statusDiv = document.getElementById('status') as HTMLDivElement;
        
        // Store input field references
        for (let i = 1; i <= 4; i++) {
            const input = document.getElementById(`input${i}`) as HTMLInputElement;
            if (input) {
                this.inputFields.push(input);
            }
        }

        console.log('✅ UI rendered successfully');
    }

    /**
     * Generate HTML structure
     */
    private getHTML(): string {
        return `
            <div class="input-group">
                ${this.generateInputFields()}
            </div>
            
            <button id="predictBtn" class="btn btn-primary" disabled>
                <span>🔮 Make Prediction</span>
            </button>
            
            <div id="result" class="result"></div>
        `;
    }

    /**
     * Generate input fields HTML
     */
    private generateInputFields(): string {
        let html = '';
        const defaultValues = [0.1, 0.2, 0.3, 0.4];
        
        for (let i = 1; i <= 4; i++) {
            html += `
                <div class="input-wrapper">
                    <label for="input${i}">Input ${i}:</label>
                    <input 
                        type="number" 
                        id="input${i}" 
                        class="input-field"
                        placeholder="${defaultValues[i - 1]}"
                        value="${defaultValues[i - 1]}"
                        step="0.01"
                        min="0"
                        max="1"
                    />
                </div>
            `;
        }
        
        return html;
    }

    /**
     * Setup event listeners
     */
    private setupEventListeners(): void {
        // Prediction button
        const predictBtn = document.getElementById('predictBtn');
        if (predictBtn) {
            predictBtn.addEventListener('click', () => this.handlePrediction());
        }

        // Input validation
        for (let i = 1; i <= 4; i++) {
            const input = document.getElementById(`input${i}`) as HTMLInputElement;
            if (input) {
                input.addEventListener('input', (e) => {
                    this.validateInput(e.target as HTMLInputElement);
                });
            }
        }
    }

    /**
     * Enable prediction button
     */
    public enablePredictionButton(): void {
        if (this.predictButton) {
            this.predictButton.disabled = false;
        }
    }

    /**
     * Show status message
     */
    public showStatus(message: string, type: 'success' | 'info' | 'error' = 'info'): void {
        if (this.statusDiv) {
            this.statusDiv.className = `status-bar status-${type}`;
            this.statusDiv.textContent = message;
        }
    }

    /**
     * Show error message
     */
    public showError(message: string): void {
        if (this.resultDiv) {
            this.resultDiv.innerHTML = `
                <div class="error">
                    <div class="icon">⚠️</div>
                    <div class="error-content">
                        <div class="error-title">Error</div>
                        <div class="error-message">${message}</div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Validate input field
     */
    private validateInput(input: HTMLInputElement): void {
        const value = parseFloat(input.value);
        
        if (isNaN(value) || value < 0 || value > 1) {
            input.classList.add('invalid');
            input.classList.remove('valid');
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
        }
    }

    /**
     * Handle prediction button click
     */
    private async handlePrediction(): Promise<void> {
        if (!this.modelManager.isModelLoaded()) {
            this.showError('Model is not loaded yet. Please wait...');
            return;
        }

        // Get input values
        const inputs: number[] = [];
        let hasError = false;

        for (const input of this.inputFields) {
            const value = parseFloat(input.value);
            
            if (isNaN(value) || value < 0 || value > 1) {
                this.showError('Please enter valid values between 0 and 1 for all inputs');
                hasError = true;
                break;
            }
            
            inputs.push(value);
        }

        if (hasError) return;

        console.log('🚀 Starting prediction with inputs:', inputs);

        // Show loading state
        this.showLoading();

        // Disable button
        if (this.predictButton) {
            this.predictButton.disabled = true;
            const span = this.predictButton.querySelector('span');
            if (span) span.textContent = '⏳ Processing...';
        }

        try {
            // Make prediction
            const result = await this.modelManager.predict(inputs);
            
            if (result) {
                this.displayPrediction(result, inputs);
            } else {
                this.showError('Prediction failed. Please try again.');
            }
        } catch (error) {
            console.error('Prediction error:', error);
            this.showError(`Prediction failed: ${(error as Error).message}`);
        } finally {
            // Re-enable button
            if (this.predictButton) {
                this.predictButton.disabled = false;
                const span = this.predictButton.querySelector('span');
                if (span) span.textContent = '🔮 Make Prediction';
            }
        }
    }

    /**
     * Show loading state
     */
    private showLoading(): void {
        if (this.resultDiv) {
            this.resultDiv.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Making prediction...</p>
                </div>
            `;
        }
    }

    /**
     * Display prediction results
     */
    private displayPrediction(result: PredictionResult, inputs: number[]): void {
        if (!this.resultDiv) return;

        const confidence = Math.round(result.confidence * 100);
        
        let html = '<div class="success">';
        html += '<h3>✅ Prediction Result</h3>';
        
        // Input echo
        html += '<div class="info-section">';
        html += '<strong>📥 Your Inputs:</strong>';
        html += '<div class="info-section-content">';
        inputs.forEach((value, index) => {
            html += `Input ${index + 1}: ${value.toFixed(3)}<br>`;
        });
        html += '</div>';
        html += '</div>';
        
        // Predicted class
        html += '<div class="prediction-class">';
        html += '<strong>🎯 Predicted Class:</strong>';
        html += `<span class="highlight">${result.predictedClass}</span>`;
        html += '</div>';
        
        // Confidence
        html += '<div class="confidence">';
        html += '<strong>📊 Confidence:</strong>';
        html += `<span class="highlight">${confidence}%</span>`;
        html += '</div>';
        
        // All probabilities
        html += '<div class="probabilities">';
        html += '<strong>📈 All Probabilities:</strong>';
        html += '<div class="prob-bars">';
        
        for (let i = 0; i < result.probabilities.length; i++) {
            const prob = result.probabilities[i];
            const percentage = Math.round(prob * 100);
            const barWidth = Math.max(percentage, 5); // Minimum 5% for visibility
            
            html += '<div class="prob-item">';
            html += `<span class="prob-label">Class ${i}:</span>`;
            html += '<div class="prob-bar-container">';
            html += `<div class="prob-bar" style="width: ${barWidth}%"></div>`;
            html += '</div>';
            html += `<span class="prob-value">${percentage}%</span>`;
            html += '</div>';
        }
        
        html += '</div>';
        html += '</div>';
        html += '</div>';
        
        this.resultDiv.innerHTML = html;
    }
}