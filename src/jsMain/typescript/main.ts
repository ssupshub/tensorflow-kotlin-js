/**
 * Main Application Entry Point
 * TensorFlow.js with Kotlin/JS and TypeScript
 */

import { ModelManager } from './core/ModelManager';
import { UIManager } from './ui/UIManager';
import type { ModelConfig } from './types/tensorflow';

/**
 * Application configuration
 */
const APP_CONFIG: ModelConfig = {
    modelPath: 'model/model.json',
    inputShape: [4],
    outputClasses: 3
};

/**
 * Application class
 */
class Application {
    private modelManager: ModelManager;
    private uiManager: UIManager;

    constructor() {
        console.log('🚀 Starting TensorFlow.js TypeScript Application...');
        
        this.modelManager = new ModelManager(APP_CONFIG);
        this.uiManager = new UIManager(this.modelManager);
    }

    /**
     * Initialize the application
     */
    public async initialize(): Promise<void> {
        try {
            console.log('📦 Initializing components...');
            
            // Render UI first
            this.uiManager.render();
            
            // Load model
            console.log('🔄 Loading TensorFlow.js model...');
            
            await new Promise<void>((resolve, reject) => {
                this.modelManager.loadModel((success, error) => {
                    if (success) {
                        console.log('✅ Model loaded successfully!');
                        this.uiManager.enablePredictionButton();
                        this.uiManager.showStatus('Model loaded and ready!', 'success');
                        resolve();
                    } else {
                        console.error('❌ Failed to load model:', error);
                        this.uiManager.showError(
                            'Failed to load model. Please check console for details.'
                        );
                        reject(error);
                    }
                });
            });
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showInitializationError();
        }
    }

    /**
     * Show initialization error
     */
    private showInitializationError(): void {
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #ef4444;">
                    <h2>⚠️ Initialization Error</h2>
                    <p>Failed to start the application. Please check the console for details.</p>
                </div>
            `;
        }
    }
}

/**
 * Start application when DOM is ready
 */
window.addEventListener('DOMContentLoaded', () => {
    const app = new Application();
    app.initialize();
});

/**
 * Clean up on page unload
 */
window.addEventListener('beforeunload', () => {
    console.log('👋 Cleaning up...');
});