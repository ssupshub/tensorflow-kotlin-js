package com.tfjs

import kotlinx.browser.document
import kotlinx.html.*
import kotlinx.html.dom.append
import kotlinx.html.js.onClickFunction
import kotlinx.html.js.onInputFunction
import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLInputElement

/**
 * Handles all UI rendering and interactions
 */
class UI(private val modelManager: ModelManager) {
    private var predictButton: HTMLButtonElement? = null
    private var resultDiv: HTMLDivElement? = null
    private var statusDiv: HTMLDivElement? = null
    
    /**
     * Render the main UI
     */
    fun render() {
        val container = document.getElementById("app") as? HTMLDivElement
        
        if (container == null) {
            console.error("App container not found!")
            return
        }
        
        container.innerHTML = "" // Clear existing content
        
        container.append {
            div("container") {
                // Header
                h1 {
                    +"🤖 TensorFlow.js with Kotlin/JS"
                }
                
                // Status bar
                div {
                    id = "status"
                    classes = setOf("status-bar")
                    +"Loading model..."
                }
                
                // Main card
                div("card") {
                    h2 { +"Neural Network Prediction" }
                    p { 
                        +"This demo uses a simple neural network to classify inputs. "
                        +"Enter 4 values between 0 and 1:"
                    }
                    
                    // Input fields
                    div("input-group") {
                        for (i in 1..4) {
                            div("input-wrapper") {
                                label {
                                    htmlFor = "input$i"
                                    +"Input $i:"
                                }
                                input(type = InputType.number) {
                                    id = "input$i"
                                    classes = setOf("input-field")
                                    placeholder = "0.${i}"
                                    value = (0.1 * i).toString()
                                    attributes["step"] = "0.01"
                                    attributes["min"] = "0"
                                    attributes["max"] = "1"
                                    
                                    onInputFunction = { event ->
                                        validateInput(event.target as HTMLInputElement)
                                    }
                                }
                            }
                        }
                    }
                    
                    // Prediction button
                    button {
                        id = "predictBtn"
                        classes = setOf("btn", "btn-primary")
                        disabled = true
                        +"🔮 Make Prediction"
                        onClickFunction = { 
                            handlePrediction() 
                        }
                    }
                    
                    // Result area
                    div {
                        id = "result"
                        classes = setOf("result")
                    }
                }
                
                // Footer
                div("footer") {
                    p {
                        +"Built with "
                        strong { +"Kotlin/JS" }
                        +" and "
                        strong { +"TensorFlow.js" }
                    }
                }
            }
        }
        
        // Store references
        predictButton = document.getElementById("predictBtn") as? HTMLButtonElement
        resultDiv = document.getElementById("result") as? HTMLDivElement
        statusDiv = document.getElementById("status") as? HTMLDivElement
        
        console.log("UI rendered successfully")
    }
    
    /**
     * Enable the prediction button
     */
    fun enablePredictionButton() {
        predictButton?.disabled = false
        predictButton?.textContent = "🔮 Make Prediction"
    }
    
    /**
     * Show status message
     */
    fun showStatus(message: String, type: String = "info") {
        statusDiv?.innerHTML = """
            <div class="status-$type">$message</div>
        """.trimIndent()
    }
    
    /**
     * Show error message
     */
    fun showError(message: String) {
        resultDiv?.innerHTML = """
            <div class="error">
                <span class="icon">⚠️</span>
                <div>$message</div>
            </div>
        """.trimIndent()
    }
    
    /**
     * Validate input field
     */
    private fun validateInput(input: HTMLInputElement) {
        val value = input.value.toDoubleOrNull()
        
        if (value == null || value < 0 || value > 1) {
            input.style.borderColor = "#f44336"
        } else {
            input.style.borderColor = "#4caf50"
        }
    }
    
    /**
     * Handle prediction button click
     */
    private fun handlePrediction() {
        if (!modelManager.isModelLoaded()) {
            showError("Model is not loaded yet. Please wait...")
            return
        }
        
        // Get input values
        val inputs = (1..4).map { i ->
            val input = document.getElementById("input$i") as? HTMLInputElement
            val value = input?.value?.toDoubleOrNull()
            
            if (value == null || value < 0 || value > 1) {
                showError("Please enter valid values between 0 and 1 for all inputs")
                return
            }
            value
        }.toTypedArray()
        
        console.log("Starting prediction with inputs:", inputs.joinToString())
        
        // Show loading state
        resultDiv?.innerHTML = """
            <div class="loading">
                <div class="spinner"></div>
                <p>Making prediction...</p>
            </div>
        """.trimIndent()
        
        predictButton?.disabled = true
        predictButton?.textContent = "⏳ Processing..."
        
        // Make prediction
        modelManager.predict(inputs)?.then { prediction ->
            displayPrediction(prediction, inputs)
            predictButton?.disabled = false
            predictButton?.textContent = "🔮 Make Prediction"
        }?.catch { error ->
            showError("Prediction failed: ${error.message ?: "Unknown error"}")
            predictButton?.disabled = false
            predictButton?.textContent = "🔮 Make Prediction"
        }
    }
    
    /**
     * Display prediction results
     */
    private fun displayPrediction(prediction: FloatArray, inputs: Array<Double>) {
        val maxIndex = prediction.indices.maxByOrNull { prediction[it] } ?: 0
        val confidence = (prediction[maxIndex] * 100).toInt()
        
        val html = buildString {
            append("""<div class="success">""")
            append("<h3>✅ Prediction Result</h3>")
            
            // Input echo
            append("<div class='info-section'>")
            append("<strong>📥 Your Inputs:</strong><br>")
            inputs.forEachIndexed { i, value ->
                append("Input ${i + 1}: ${String.format("%.3f", value)}<br>")
            }
            append("</div>")
            
            // Predicted class
            append("<div class='prediction-class'>")
            append("<strong>🎯 Predicted Class:</strong> <span class='highlight'>$maxIndex</span>")
            append("</div>")
            
            // Confidence
            append("<div class='confidence'>")
            append("<strong>📊 Confidence:</strong> <span class='highlight'>$confidence%</span>")
            append("</div>")
            
            // All probabilities
            append("<div class='probabilities'>")
            append("<strong>📈 All Probabilities:</strong><br>")
            append("<div class='prob-bars'>")
            prediction.forEachIndexed { i, prob ->
                val percentage = (prob * 100).toInt()
                val barWidth = maxOf(percentage, 5) // Minimum 5% for visibility
                append("""
                    <div class='prob-item'>
                        <span class='prob-label'>Class $i:</span>
                        <div class='prob-bar-container'>
                            <div class='prob-bar' style='width: ${barWidth}%'></div>
                        </div>
                        <span class='prob-value'>$percentage%</span>
                    </div>
                """.trimIndent())
            }
            append("</div>")
            append("</div>")
            
            append("</div>")
        }
        
        resultDiv?.innerHTML = html
    }
}
