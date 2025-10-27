package com.tfjs

import kotlinx.browser.document
import kotlinx.browser.window

/**
 * Application entry point
 */
fun main() {
    console.log("🚀 Starting TensorFlow.js Kotlin/JS Application...")
    
    window.onload = {
        try {
            initializeApp()
        } catch (e: Throwable) {
            console.error("Failed to initialize app:", e)
            showInitializationError()
        }
    }
}

/**
 * Initialize the application
 */
fun initializeApp() {
    console.log("📦 Initializing components...")
    
    val modelManager = ModelManager()
    val ui = UI(modelManager)
    
    // Render UI first
    ui.render()
    
    // Load model
    console.log("🔄 Loading TensorFlow.js model...")
    modelManager.loadModel { success ->
        if (success) {
            console.log("✅ Model loaded successfully!")
            ui.enablePredictionButton()
            ui.showStatus("Model loaded and ready!", "success")
        } else {
            console.error("❌ Failed to load model")
            ui.showError("Failed to load model. Please check console for details.")
        }
    }
}

/**
 * Show error if app fails to initialize
 */
fun showInitializationError() {
    document.getElementById("app")?.innerHTML = """
        <div style="text-align: center; padding: 50px; color: white;">
            <h1>⚠️ Initialization Error</h1>
            <p>Failed to start the application. Please check the console for details.</p>
        </div>
    """.trimIndent()
}
