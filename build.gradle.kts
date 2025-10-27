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
                implementation(npm("@tensorflow/tfjs", "4.15.0"))
            }
        }
    }
}
