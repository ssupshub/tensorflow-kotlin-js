package com.tfjs

import kotlinx.coroutines.*
import kotlin.js.Promise

/**
 * External declarations for TensorFlow.js
 */
@JsModule("@tensorflow/tfjs")
@JsNonModule
external object tf {
    fun loadLayersModel(path: String): Promise<dynamic>
    fun tensor2d(data: Array<Array<Double>>): dynamic
    fun tidy(fn: () -> dynamic): dynamic
}

/**
 * Manages TensorFlow.js model loading and predictions
 */
class ModelManager {
    private var model: dynamic = null
    private val scope = CoroutineScope(Dispatchers.Default)
    
    /**
     * Load the TensorFlow.js model
     */
    fun loadModel(callback: (Boolean) -> Unit) {
        scope.launch {
            try {
                console.log("Loading model from: model/model.json")
                model = tf.loadLayersModel("model/model.json").await()
                console.log("Model loaded successfully")
                console.log("Model details:", model)
                callback(true)
            } catch (e: Throwable) {
                console.error("Error loading model:", e.message ?: "Unknown error")
                console.error("Stack trace:", e)
                callback(false)
            }
        }
    }
    
    /**
     * Make a prediction using the loaded model
     * @param input Array of 4 double values
     * @return Promise with FloatArray of predictions
     */
    fun predict(input: Array<Double>): Promise<FloatArray>? {
        if (model == null) {
            console.error("Prediction attempted but model is not loaded!")
            return null
        }
        
        console.log("Making prediction with input:", input.joinToString())
        
        return Promise { resolve, reject ->
            try {
                val result = tf.tidy {
                    // Create 2D tensor with shape [1, 4]
                    val inputTensor = tf.tensor2d(arrayOf(input))
                    console.log("Input tensor created")
                    
                    // Make prediction
                    val prediction = model.predict(inputTensor)
                    console.log("Prediction made")
                    
                    // Extract data
                    prediction.data()
                }
                
                result.then { data ->
                    val floatArray = data as FloatArray
                    console.log("Prediction result:", floatArray.joinToString())
                    resolve(floatArray)
                }.catch { error ->
                    console.error("Prediction error:", error)
                    reject(error)
                }
            } catch (e: Throwable) {
                console.error("Exception during prediction:", e)
                reject(e)
            }
        }
    }
    
    /**
     * Check if model is loaded
     */
    fun isModelLoaded(): Boolean {
        return model != null
    }
    
    /**
     * Get model information
     */
    fun getModelInfo(): String {
        return if (model != null) {
            "Model loaded and ready"
        } else {
            "Model not loaded"
        }
    }
}
