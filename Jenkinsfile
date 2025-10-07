pipeline {
    agent any

    environment {
        CYPRESS_PROJECT = "Cypress_Automation_sute"
        REPORT_DIR = "cypress/reports/html"
        REPORT_FILE = "cypress-cucumber-poc-results.html"
        ZIP_NAME = "report.zip"
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
                    bat 'npm run test'
                }
            }
        }

        stage('Verify Report') {
            steps {
                dir("${CYPRESS_PROJECT}") {
                    bat "dir ${REPORT_DIR}"
                }
            }
        }

        stage('Zip Report') {
            steps {
                dir("${CYPRESS_PROJECT}") {
                    bat """
                        powershell Compress-Archive -Path ${REPORT_DIR}\\${REPORT_FILE} -DestinationPath ${ZIP_NAME}
                    """
                    archiveArtifacts artifacts: "${ZIP_NAME}", allowEmptyArchive: false
                }
            }
        }

        stage('Archive Raw Report') {
            steps {
                archiveArtifacts artifacts: "${CYPRESS_PROJECT}/${REPORT_DIR}/${REPORT_FILE}", allowEmptyArchive: false
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
                    <p>📄 Download the HTML report: <a href="${env.BUILD_URL}artifact/${ZIP_NAME}">Click here</a></p>
                    <p>This zipped report can be opened in any browser for full rendering.</p>
                """,
                mimeType: 'text/html',
                to: 'notauser2a@gmail.com,krishnarao533022@gmail.com',
                replyTo: 'krishnarao533022@gmail.com',
                from: 'jenkinsautomation49@gmail.com'
            )
        }
    }
}
