pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://gitlab.com/your-repo.git', branch: 'main'
            }
        }

        stage('Deploy') {
            steps {
                sh 'sh deploy.txt'
            }
        }

        stage('Verify') {
            steps {
                sh 'sh verify.txt'
            }
        }
    }

    post {
        success {
            echo 'Deployment and verification successful.'
        }
        failure {
            echo 'Deployment or verification failed.'
        }
    }
}
