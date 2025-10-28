# 🤖 TensorFlow.js with Kotlin/JS

> A modern, production-ready web application demonstrating **browser-based machine learning** using TensorFlow.js and Kotlin/JS. Train models in Python, deploy them to the web, and run predictions entirely in the browser—no server required!

[![Kotlin](https://img.shields.io/badge/Kotlin-1.9.22-blue.svg)](https://kotlinlang.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.15.0-orange.svg)](https://www.tensorflow.org/js)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📸 Screenshots

### Main Application Interface
```
┌─────────────────────────────────────────────────┐
│  🤖 TensorFlow.js with Kotlin/JS                │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │ ✅ Model loaded and ready!             │    │
│  └────────────────────────────────────────┘    │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │  Neural Network Prediction              │    │
│  │                                          │    │
│  │  Input 1: [0.1]  Input 2: [0.2]        │    │
│  │  Input 3: [0.3]  Input 4: [0.4]        │    │
│  │                                          │    │
│  │  [ 🔮 Make Prediction ]                 │    │
│  │                                          │    │
│  │  ✅ Prediction Result                   │    │
│  │  🎯 Predicted Class: 1 (85% confidence)│    │
│  │  📊 All Probabilities:                  │    │
│  │  Class 0: ████ 10%                      │    │
│  │  Class 1: ████████████████ 85%         │    │
│  │  Class 2: █ 5%                          │    │
│  └────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

---

## 🎯 What is This Project?

This project demonstrates **end-to-end machine learning deployment** from training to browser inference:

### **The Problem It Solves:**
Traditional ML applications require:
- ❌ Server infrastructure for predictions
- ❌ Backend APIs to handle model inference
- ❌ Network latency for each prediction
- ❌ Server costs and scaling concerns

### **This Solution Provides:**
- ✅ **Client-side ML** - Models run directly in the browser
- ✅ **Zero latency** - Instant predictions without server calls
- ✅ **Privacy-first** - Data never leaves the user's device
- ✅ **Scalable** - No backend infrastructure needed
- ✅ **Type-safe** - Kotlin provides compile-time safety

---

## 🔍 How It Works

### **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT PHASE                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. PYTHON (Training)                                        │
│     ┌──────────────┐                                         │
│     │   Dataset    │                                         │
│     └──────┬───────┘                                         │
│            │                                                  │
│            ▼                                                  │
│     ┌──────────────┐      ┌─────────────────┐              │
│     │ TensorFlow   │─────▶│  Trained Model  │              │
│     │   Training   │      │   (Keras HDF5)  │              │
│     └──────────────┘      └────────┬────────┘              │
│                                     │                         │
│                                     │ Convert                 │
│                                     ▼                         │
│                          ┌──────────────────┐                │
│                          │ TensorFlow.js    │                │
│                          │  Model Format    │                │
│                          │ (model.json +    │                │
│                          │  weight files)   │                │
│                          └────────┬─────────┘                │
└──────────────────────────────────┼──────────────────────────┘
                                    │
                                    │ Deploy
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION PHASE                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  2. KOTLIN/JS (Browser Runtime)                              │
│                                                               │
│     ┌──────────────────┐                                     │
│     │   User Browser   │                                     │
│     │                  │                                     │
│     │  ┌────────────┐  │                                     │
│     │  │ Kotlin/JS  │  │   Loads model.json                 │
│     │  │   Code     │──┼──────────────┐                     │
│     │  └────────────┘  │               │                     │
│     │                  │               ▼                     │
│     │  ┌────────────┐  │   ┌──────────────────┐             │
│     │  │TensorFlow  │  │   │  Neural Network  │             │
│     │  │    .js     │◀─┼───│   in Browser     │             │
│     │  └────────────┘  │   └──────────────────┘             │
│     │        │         │                                     │
│     │        │ Makes predictions                             │
│     │        ▼         │                                     │
│     │  ┌────────────┐  │                                     │
│     │  │   UI/DOM   │  │                                     │
│     │  │  Updates   │  │                                     │
│     │  └────────────┘  │                                     │
│     └──────────────────┘                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### **Step-by-Step Process:**

#### **Phase 1: Model Training (Python)**
1. 📊 **Data Preparation** - Create or load training dataset
2. 🏗️ **Model Architecture** - Define neural network layers
3. 🎓 **Training** - Train model using TensorFlow/Keras
4. 💾 **Conversion** - Convert to TensorFlow.js format
5. 📦 **Export** - Generate `model.json` and weight files

#### **Phase 2: Browser Deployment (Kotlin/JS)**
1. 🌐 **Page Load** - User opens web application
2. ⬇️ **Model Loading** - TensorFlow.js loads model files
3. 📝 **User Input** - User enters data in the form
4. 🔮 **Inference** - Model processes input locally
5. 📊 **Results Display** - Show predictions and probabilities

### **Key Technologies:**

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Python** | Model training | Industry-standard ML framework |
| **TensorFlow** | Neural network creation | Powerful, well-documented library |
| **TensorFlow.js** | Browser inference | Run models in JavaScript |
| **Kotlin/JS** | Type-safe frontend | Better than plain JavaScript |
| **Gradle** | Build automation | Dependency management |
| **Webpack** | Module bundling | Optimize JavaScript delivery |

---

## ✨ Features

- 🧠 **Neural Network Inference** - 3-layer feedforward network
- 🔥 **Kotlin/JS** - Type-safe, modern frontend development
- 📦 **TensorFlow.js 4.15** - Latest ML capabilities
- 🎨 **Modern UI** - Glassmorphism design with animations
- ⚡ **Real-time Predictions** - Instant results (<100ms)
- 🔄 **Hot Reload** - Fast development cycle
- 📊 **Visual Feedback** - Animated probability bars
- 🎯 **Input Validation** - Real-time error checking
- 📱 **Responsive Design** - Works on mobile and desktop
- 🔒 **Privacy-First** - All processing happens locally

---

## 🔧 Prerequisites

### Required Software:

#### For Model Training:
```bash
Python 3.8+        # Download: https://www.python.org/downloads/
pip 20.0+          # Comes with Python
```

#### For Web Application:
```bash
JDK 11+            # Download: https://adoptium.net/
Node.js 16+ (optional)  # For npm packages
```

### Verify Installation:

```bash
# Check Python
python --version
# Output: Python 3.8.x or higher

# Check pip
pip --version
# Output: pip 20.x.x

# Check Java
java -version
# Output: openjdk 11.x.x or higher

# Gradle is included (wrapper)
./gradlew --version
# Output: Gradle 7.x
```

---

## 📥 Installation

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/tensorflow-kotlin-js.git
cd tensorflow-kotlin-js
```

### **2. Python Environment Setup**

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
cd python
pip install -r requirements.txt
```

**Expected Output:**
```
Collecting tensorflow==2.15.0
Collecting tensorflowjs==4.15.0
Collecting numpy==1.24.3
...
Successfully installed tensorflow-2.15.0 tensorflowjs-4.15.0 numpy-1.24.3
```

---

## 🚀 Quick Start Guide

### **Step 1: Train the Model** ⏱️ ~2 minutes

```bash
cd python
python train_model.py
```

**What happens:**
```
============================================================
TensorFlow.js Model Training
============================================================

[1/5] Creating model...
[2/5] Model Summary:
_________________________________________________________________
Layer (type)                Output Shape              Param #   
=================================================================
dense_1 (Dense)             (None, 64)                320       
dropout (Dropout)           (None, 64)                0         
dense_2 (Dense)             (None, 32)                2080      
dropout_1 (Dropout)         (None, 32)                0         
output (Dense)              (None, 3)                 99        
=================================================================
Total params: 2,499

[3/5] Generating training data...
Training samples: 500
Validation samples: 100

[4/5] Training model...
Epoch 1/20
16/16 [==============================] - 1s 3ms/step
Epoch 2/20
16/16 [==============================] - 0s 2ms/step
...
Epoch 20/20
16/16 [==============================] - 0s 2ms/step

[5/5] Saving model to .../python/model...

============================================================
✓ Model saved successfully!
✓ Final validation accuracy: 0.3400
============================================================

Next steps:
1. Copy the 'model' folder to your project root
2. Run: ./gradlew browserDevelopmentRun
============================================================
```

**Files created:**
```
python/model/
├── model.json              # Model architecture (3KB)
├── group1-shard1of1.bin    # Weights (10KB)
```

### **Step 2: Copy Model to Project** ⏱️ 5 seconds

```bash
# From project root
cd ..
cp -r python/model ./

# Verify
ls model/
# Output: model.json  group1-shard1of1.bin
```

### **Step 3: Launch Application** ⏱️ ~30 seconds (first run)

```bash
./gradlew browserDevelopmentRun
```

**What happens:**
```
> Task :kotlinNpmInstall
npm install @tensorflow/tfjs@4.15.0
...

> Task :browserDevelopmentWebpack
Compiled successfully!

> Task :browserDevelopmentRun
ℹ Project is running at http://localhost:8080/
✔ Compiled successfully
```

**Browser opens automatically!** 🎉

### **Step 4: Make Your First Prediction** ⏱️ 10 seconds

1. **Wait for status**: "✅ Model loaded and ready!"
2. **Enter values**: Try `0.1, 0.2, 0.3, 0.4`
3. **Click**: "🔮 Make Prediction"
4. **See results**: Predicted class with confidence scores

---

## 📖 Detailed Usage

### **Understanding the Inputs**

The model expects **4 numerical inputs** between 0 and 1:

```
Input 1: 0.1  ─┐
Input 2: 0.2  ─┼─→ Neural Network ─→ Predicted Class: 0, 1, or 2
Input 3: 0.3  ─┤
Input 4: 0.4  ─┘
```

**Example scenarios:**

| Inputs | Likely Output | Why |
|--------|---------------|-----|
| All close to 0 (0.1, 0.1, 0.1, 0.1) | Class 0 | Low values pattern |
| Mid-range (0.5, 0.5, 0.5, 0.5) | Class 1 | Balanced pattern |
| High values (0.9, 0.9, 0.9, 0.9) | Class 2 | High values pattern |

### **Reading the Results**

```
✅ Prediction Result

📥 Your Inputs:
Input 1: 0.100
Input 2: 0.200
Input 3: 0.300
Input 4: 0.400

🎯 Predicted Class: 1
📊 Confidence: 85%

📈 All Probabilities:
Class 0: ████ 10%            ← Low probability
Class 1: ████████████████ 85% ← HIGH CONFIDENCE
Class 2: █ 5%                ← Very low probability
```

**What this means:**
- **Predicted Class**: The most likely classification
- **Confidence**: How certain the model is (higher = more confident)
- **Probabilities**: Breakdown across all possible classes

---

## 💻 Development Guide

### **Project Structure Explained**

```
tensorflow-kotlin-js/
│
├── python/                    # 🐍 Machine Learning
│   ├── requirements.txt       # Python dependencies
│   ├── train_model.py         # Training script
│   └── model/                 # Generated model files
│
├── src/jsMain/               # 🎨 Frontend Code
│   ├── kotlin/com/tfjs/
│   │   ├── Main.kt           # App entry point
│   │   ├── ModelManager.kt   # TensorFlow.js wrapper
│   │   └── UI.kt             # User interface
│   └── resources/
│       └── index.html        # HTML + Styles
│
├── build.gradle.kts          # ⚙️ Build configuration
├── settings.gradle.kts       # Project settings
└── README.md                 # 📚 This file
```

### **Making Changes**

#### **Modify the Model (Python):**

Edit `python/train_model.py`:

```python
# Change architecture
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(4,)),  # More neurons
    tf.keras.layers.Dense(64, activation='relu'),  # Add layer
    tf.keras.layers.Dense(3, activation='softmax')
])

# Change training
model.fit(x_train, y_train, epochs=50, batch_size=16)  # More epochs
```

Then retrain:
```bash
python train_model.py
cp -r model ../
```

#### **Modify the UI (Kotlin):**

Edit `src/jsMain/kotlin/com/tfjs/UI.kt`:

```kotlin
// Change input fields
div("input-group") {
    for (i in 1..6) {  // 6 inputs instead of 4
        input(type = InputType.number) {
            id = "input$i"
            // ... configuration
        }
    }
}
```

Changes auto-reload in development mode!

### **Development Commands**

```bash
# Start dev server with hot reload
./gradlew browserDevelopmentRun

# Clean build artifacts
./gradlew clean

# Build without running
./gradlew browserDevelopmentWebpack

# Check dependencies
./gradlew dependencies

# Format code (if configured)
./gradlew ktlintFormat
```

---

## 📦 Production Build

### **Create Optimized Build**

```bash
./gradlew browserProductionWebpack
```

**Output:** `build/distributions/`

```
build/distributions/
├── tensorflow-kotlin-js.js      # Minified bundle (~500KB)
├── tensorflow-kotlin-js.js.map  # Source maps
├── index.html                   # Entry point
└── model/                       # Model files
    ├── model.json
    └── *.bin
```

### **Deploy to Production**

#### **Option 1: Netlify (Easiest)**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd build/distributions
netlify deploy --prod
```

#### **Option 2: GitHub Pages**

```bash
# Build
./gradlew browserProductionWebpack

# Copy to docs/
cp -r build/distributions/* docs/
cp -r model docs/

# Commit and push
git add docs/
git commit -m "Deploy to GitHub Pages"
git push
```

Enable in Settings → Pages → Source: `/docs`

#### **Option 3: Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd build/distributions
vercel --prod
```

---

## 🔧 Troubleshooting

### **Common Issues & Solutions**

#### **Problem: Model not loading in browser**

```
❌ Error: Failed to fetch model
```

**Solution:**
```bash
# Ensure model exists
ls model/model.json

# Check file permissions
chmod 644 model/*

# Verify webpack config
cat webpack.config.d/config.js
```

#### **Problem: Gradle build fails**

```
❌ Could not resolve all files for configuration ':jsMainImplementation'
```

**Solution:**
```bash
# Clear Gradle cache
rm -rf ~/.gradle/caches/

# Clean project
./gradlew clean

# Rebuild
./gradlew build --refresh-dependencies
```

#### **Problem: Python dependencies conflict**

```
❌ ERROR: pip's dependency resolver does not currently take into account all the packages
```

**Solution:**
```bash
# Use fresh virtual environment
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

#### **Problem: Port 8080 already in use**

```
❌ Error: listen EADDRINUSE: address already in use :::8080
```

**Solution:**
```bash
# Change port in build.gradle.kts
runTask {
    devServer = devServer?.copy(
        port = 3000  # Use different port
    )
}
```

Or kill existing process:
```bash
# Linux/Mac
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

## 🎓 Learning Resources

### **Understanding the Code**

- [Kotlin/JS Documentation](https://kotlinlang.org/docs/js-overview.html)
- [TensorFlow.js Guide](https://www.tensorflow.org/js/guide)
- [Neural Networks Basics](https://www.3blue1brown.com/topics/neural-networks)

### **Next Steps to Learn**

1. **Add more features**:
   - File upload for bulk predictions
   - Model comparison (A/B testing)
   - Export results to CSV
   
2. **Use real datasets**:
   - Iris dataset (classification)
   - MNIST (digit recognition)
   - Custom image classifier

3. **Advanced techniques**:
   - Transfer learning
   - Model quantization
   - WebGL acceleration

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 🙏 Acknowledgments

- TensorFlow.js team for browser ML capabilities
- Kotlin team for excellent JS interop
- Community contributors

---

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/tensorflow-kotlin-js/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/tensorflow-kotlin-js/discussions)
- 📧 **Email**: your.email@example.com

---

**Built with ❤️ using Kotlin/JS and TensorFlow.js**
