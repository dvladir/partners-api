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
            steps {
                echo 'CURRENT:'
                sh 'echo $PWD'
                sh 'ls -a .'
                sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=out.tar --file Dockerfile.deploy .'
                sh 'gzip out.tar'
                withCredentials([sshUserPrivateKey(credentialsId: 'deploy', keyFileVariable: 'keyfile')]) {
                    sh "scp -i ${keyfile} ./out.tar.gz host.docker.internal:~"
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