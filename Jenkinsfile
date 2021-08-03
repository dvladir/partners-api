pipeline {
    options {
        disableConcurrentBuilds()
    }

    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'rastasheep/alpine-node-chromium:14-alpine'
                    args '--net=host'
                    reuseNode true
                }
            }
            steps {
                sh 'yarn'
                sh 'yarn build'
            }
        }
        stage('Deploy') {
            environment {
                DEPLOY_HOST = credentials('deploy-host')
                DEPLOY_PORT = credentials('deploy-port')
            }
            steps {
                sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=out.tar --file Dockerfile.deploy .'
                sh 'gzip out.tar'
                withCredentials([sshUserPrivateKey(
                        credentialsId: 'deploy',
                        keyFileVariable: 'keyfile',
                        passphraseVariable: 'passphrase',
                        usernameVariable: 'userName'
                )]) {
                    sh 'echo ${passphrase} >> pass'
                    sh 'sshpass -Ppassphrase -f ./pass scp -o StrictHostKeyChecking=no -i ${keyfile} -P ${DEPLOY_PORT} ./out.tar.gz ${userName}@${DEPLOY_HOST}:~'
                    sh 'rm ./pass'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}