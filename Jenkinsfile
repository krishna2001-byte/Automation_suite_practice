pipeline {
    agent any

    environment {
        CYPRESS_PROJECT = "Cypress_Automation_sute"
        REPORT_PATH = "cypress/reports/html/cypress-cucumber-poc-results.html"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir("${CYPRESS_PROJECT}") {
                    bat 'npm install'
                    bat 'npx cypress install'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                dir("${CYPRESS_PROJECT}") {
                    bat 'npx cypress run'
                }
            }
        }

        stage('Verify Report') {
            steps {
                bat "dir ${CYPRESS_PROJECT}\\cypress\\reports\\html"
            }
        }

       stage('Zip Report') {
    steps {
        bat """
            powershell Compress-Archive -Path ${CYPRESS_PROJECT}\\${REPORT_PATH} -DestinationPath ${CYPRESS_PROJECT}\\report.zip -Force
        """
        archiveArtifacts artifacts: "${CYPRESS_PROJECT}/report.zip", allowEmptyArchive: false
    }
}


        stage('Archive Raw Report') {
            steps {
                archiveArtifacts artifacts: "${CYPRESS_PROJECT}/${REPORT_PATH}", allowEmptyArchive: false
            }
        }
    }

    post {
        always {
            emailext(
                subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
                    <p><strong>${env.JOB_NAME}</strong> - Build #${env.BUILD_NUMBER} - <strong>${currentBuild.currentResult}</strong></p>
                    <p>✅ Console output: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p>📄 Download the HTML report: <a href="${env.BUILD_URL}artifact/${CYPRESS_PROJECT}/report.zip">Click here</a></p>
                    <p>This zipped report can be opened in any browser for full rendering.</p>
                """,
                mimeType: 'text/html',
                to: 'notauser2a@gmail.com,krishnarao533022@gmail.com',
                replyTo: 'krishnarao533022@gmail.com'
            )
        }
    }
}