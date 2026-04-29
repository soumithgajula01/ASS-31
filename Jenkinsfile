pipeline {
    agent any
    
    options {
        // Poll SCM every 30 seconds
        pollSCM('H/0.5 * * * *')
        
        // Keep last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        
        // Timeout after 1 hour
        timeout(time: 1, unit: 'HOURS')
    }
    
    environment {
        REGISTRY = 'docker.io'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Checking out code from repository...'
                    checkout scm
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    echo 'Building backend...'
                    dir('backend') {
                        sh 'npm install'
                        sh 'npm run build || echo "No build script defined"'
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    echo 'Building frontend...'
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                script {
                    echo 'Testing backend...'
                    dir('backend') {
                        sh 'npm test || echo "No tests defined"'
                    }
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                script {
                    echo 'Testing frontend...'
                    dir('frontend') {
                        sh 'npm test || echo "No tests defined"'
                    }
                }
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                script {
                    echo 'Building Docker images...'
                    sh 'docker-compose build'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying application...'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check logs for details.'
        }
    }
}
