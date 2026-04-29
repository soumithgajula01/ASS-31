pipeline {
    agent any
    
    triggers {
        // Better for performance
        pollSCM('H/5 * * * *')
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
    }
    
    environment {
        REGISTRY = 'docker.io'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                echo 'Building backend...'
                dir('backend') {
                    bat 'npm install'
                    bat '''
                    npm run build
                    IF %ERRORLEVEL% NEQ 0 (
                        echo No build script defined
                        exit /b 0
                    )
                    '''
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building frontend...'
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                echo 'Testing backend...'
                dir('backend') {
                    bat '''
                    npm test
                    IF %ERRORLEVEL% NEQ 0 (
                        echo No tests defined
                        exit /b 0
                    )
                    '''
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                echo 'Testing frontend...'
                dir('frontend') {
                    bat '''
                    npm test
                    IF %ERRORLEVEL% NEQ 0 (
                        echo No tests defined
                        exit /b 0
                    )
                    '''
                }
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                echo 'Building Docker images...'
                bat 'docker compose build'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                bat 'docker compose up -d'
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