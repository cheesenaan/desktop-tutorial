pipeline {
    agent {
        label 'GTS-J6YV-JENKINS'
    }

    stages {
        stage('Init') {
            steps {
                echo 'Hello World...'
            }
        }

        stage('Prepare resume function') {
            steps {
                // Define the temp folder path
                script {
                    def tempFolder = 'temp_resume_function'
                }

                // Create the temp folder
                sh "mkdir -p ${tempFolder}"

                // Copy contents from /function/resume folder into the temp folder
                sh "cp -r function/resume/* ${tempFolder}/"

                // Copy package.json into the temp folder
                sh "cp package.json ${tempFolder}/"

                // Run npm install inside the folder
                dir(tempFolder) {
                    sh 'npm install'
                }

                // Run the zip command on the temp folder and name it resume.zip
                sh "cd ${tempFolder} && zip -r resume.zip ."
            }
        }
    }
}

