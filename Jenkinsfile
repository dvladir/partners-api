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
                script {
                    def remote = [:]
                    remote.name = DEPLOY_HOST
                    remote.host = DEPLOY_HOST
                    remote.port = DEPLOY_PORT as Integer
                    remote.allowAnyHosts = true
                    remote.fileTransfer = 'scp'
                    withCredentials([sshUserPrivateKey(
                            credentialsId: 'deploy',
                            keyFileVariable: 'keyfile',
                            passphraseVariable: 'passphrase',
                            usernameVariable: 'userName'
                    )]) {
                        echo '12345 ${keyfile}'
                        echo '12345 ${passphrase}'
                        remote.user = userName
                        remote.idenityFile = keyfile
                        remote.passphrase = passphrase
                        sshPut remote: remote, from: './out.tar.gz', into: '.'
                    }
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