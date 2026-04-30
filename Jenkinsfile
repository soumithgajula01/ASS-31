pipeline {
    agent any

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
                bat 'docker compose down --remove-orphans'   // 🔥 FIX
                bat 'docker rm -f mongodb || echo no-container' // 🔥 EXTRA SAFETY
                bat 'docker compose up -d'
            }
        }
    }
}