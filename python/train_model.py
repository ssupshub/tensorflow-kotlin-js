import tensorflow as tf
import numpy as np
import tensorflowjs as tfjs
from pathlib import Path

def create_model():
    """Create a simple neural network for classification"""
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=(4,), name='dense_1'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(32, activation='relu', name='dense_2'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(3, activation='softmax', name='output')
    ])
    return model

def generate_sample_data():
    """Generate sample training data"""
    np.random.seed(42)
    
    # Training data
    x_train = np.random.random((500, 4)).astype(np.float32)
    y_train = np.random.randint(3, size=(500,))
    
    # Validation data
    x_val = np.random.random((100, 4)).astype(np.float32)
    y_val = np.random.randint(3, size=(100,))
    
    return x_train, y_train, x_val, y_val

def train_and_save_model():
    """Train model and save in TensorFlow.js format"""
    print("=" * 60)
    print("TensorFlow.js Model Training")
    print("=" * 60)
    
    print("\n[1/5] Creating model...")
    model = create_model()
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    print("\n[2/5] Model Summary:")
    model.summary()
    
    print("\n[3/5] Generating training data...")
    x_train, y_train, x_val, y_val = generate_sample_data()
    print(f"Training samples: {len(x_train)}")
    print(f"Validation samples: {len(x_val)}")
    
    print("\n[4/5] Training model...")
    history = model.fit(
        x_train, y_train,
        validation_data=(x_val, y_val),
        epochs=20,
        batch_size=32,
        verbose=1
    )
    
    # Create output directory
    output_dir = Path(__file__).parent / 'model'
    output_dir.mkdir(exist_ok=True)
    
    print(f"\n[5/5] Saving model to {output_dir}...")
    tfjs.converters.save_keras_model(model, str(output_dir))
    
    print("\n" + "=" * 60)
    print("✓ Model saved successfully!")
    print(f"✓ Final validation accuracy: {history.history['val_accuracy'][-1]:.4f}")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Copy the 'model' folder to your project root")
    print("2. Run: ./gradlew browserDevelopmentRun")
    print("=" * 60)

if __name__ == '__main__':
    train_and_save_model()
