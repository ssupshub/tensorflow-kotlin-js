plugins {
    kotlin("multiplatform") version "1.9.22"
}

group = "com.tfjs"
version = "1.0.0"

repositories {
    mavenCentral()
}

kotlin {
    js(IR) {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
            }
            binaries.executable()
            runTask {
                devServer = devServer?.copy(
                    open = true,
                    port = 8080
                )
            }
        }
    }
    
    sourceSets {
        val jsMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-html-js:0.11.0")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core-js:1.7.3")
                
                // TensorFlow.js
                implementation(npm("@tensorflow/tfjs", "4.15.0"))
                
                // TypeScript support
                implementation(npm("typescript", "5.3.3"))
                implementation(npm("ts-loader", "9.5.1"))
            }
        }
    }
}

// Task to compile TypeScript
tasks.register<Exec>("compileTypeScript") {
    commandLine("npx", "tsc")
    workingDir = file("src/jsMain/typescript")
}

// Make webpack depend on TypeScript compilation
tasks.named("browserDevelopmentWebpack") {
    dependsOn("compileTypeScript")
}

tasks.named("browserProductionWebpack") {
    dependsOn("compileTypeScript")
}