pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh "npm install"
        sh "npm run build"
        sh "wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb"
        sh "dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb"
        sh "npm i mongodb-memory-server"
        sh "npm install sonar-scanner"
        sh "npm run test"
        sh "npm run sonar -X"
        sh "docker build -t authentication-api:0.0.1 ."   
        print("image successfully built")
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
      }
    }
  }
}
