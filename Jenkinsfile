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
                    args '-v /usr/src/app:/usr/src/app -w /usr/src/app --net=host'
                }
            }
            steps {
                sh 'yarn'
                sh 'yarn build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=out.tar --file Dockerfile.deploy .'
                sh 'gzip out.tar'
                withCredentials([sshPrivateKey(credentialsId: 'deploy', keyFileVariable: 'keyfile')]) {
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