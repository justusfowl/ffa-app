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
                sh 'npm install ionic cordova'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('Deploy') {
            steps {
                sh 'cp -rf www/* /ffa-app'
            }
        }
    }
}

