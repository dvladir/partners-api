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
                DEPLY_PORT = credentials('deploy-port')
            }
            steps {
                echo 'CURRENT:'
                sh 'echo $PWD'
                sh 'ls -a .'
                sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=out.tar --file Dockerfile.deploy .'
                sh 'gzip out.tar'
                withCredentials([sshUserPrivateKey(credentialsId: 'deploy', keyFileVariable: 'keyfile')]) {
                    sh "scp -i $keyfile -P $DEPLY_PORT ./out.tar.gz $DEPLOY_HOST:~"
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