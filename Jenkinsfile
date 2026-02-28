pipeline {
    agent any

    stages {
        stage('Checkout code') {
            steps {
                // Correct git checkout syntax
                git branch: 'main',
                    url: 'https://github.com/hari2410-sathish/Final-Host-My-Project.git'
            }
        }

        stage('Build and Deploy with Docker') {
            steps {
                // Stop old containers (ignore errors if none running)
                sh 'docker-compose down || true'

                // Build and start containers in detached mode
                sh 'docker-compose up -d --build'
            }
        }
    }
}