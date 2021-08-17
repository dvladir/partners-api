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
                sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=partners-api.tar --file Dockerfile.deploy .'
                sh 'gzip partners-api.tar'
                withCredentials([sshUserPrivateKey(
                        credentialsId: 'deploy',
                        keyFileVariable: 'keyfile',
                        passphraseVariable: 'passphrase',
                        usernameVariable: 'userName'
                )]) {
                    sh 'echo ${passphrase} >> pass'
                    sh 'sshpass -Ppassphrase -f ./pass scp -o StrictHostKeyChecking=no -i ${keyfile} -P ${DEPLOY_PORT} ./partners-api.tar.gz ${userName}@${DEPLOY_HOST}:~/partners-deploy/partners-api.tar.gz'
                    sh 'sshpass -Ppassphrase -f ./pass ssh -o StrictHostKeyChecking=no -i ${keyfile} -p ${DEPLOY_PORT} ${userName}@${DEPLOY_HOST} cd \\~/partners-deploy \\&\\& docker import ./partners-api.tar.gz dvladir:partners-api \\&\\& ./scripts/recreate.sh api'
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