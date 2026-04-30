pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/soumithgajula01/ASS-31'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                // Stop and remove compose containers
                bat 'docker compose down --remove-orphans'

                // 🔥 Remove ANY existing conflicting containers (important fix)
                bat 'docker rm -f backend || echo backend-not-found'
                bat 'docker rm -f frontend || echo frontend-not-found'
                bat 'docker rm -f mongodb || echo mongodb-not-found'

                // Start fresh containers
                bat 'docker compose up -d --build --force-recreate'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}