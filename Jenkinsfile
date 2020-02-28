pipeline {
    agent {
        docker {
            image 'node:lts-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Setup') {
            steps {
                sh 'npm install @ionic/cli'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh "./node_modules/@ionic/cli/bin/ionic build --prod"
            }
        }

        stage('Deploy') {
            steps {
                sh 'rm -rf /ffa-app'
                sh 'cp -rf www/* /ffa-app'
            }
        }
    }
}

