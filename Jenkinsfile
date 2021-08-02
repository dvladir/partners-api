pipeline {
    opstion {
        disableConcurrentBuilds()
    }

    agent {
        docker {
            image 'rastasheep/alpine-node-chromium:14-alpine'
            args '--net=host'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'yarn'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
        stage('Deploy') {
            sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=out.tar --file Dockerfile.deploy .'
            sh 'gzip out.tar'
            withCredentials([sshPrivateKey(credentialsId: 'deploy', keyFileVariable: 'keyfile')]) {
                sh "scp -i ${keyfile} ./out.tar.gz host.docker.internal:~"
            }
        }
    }
}