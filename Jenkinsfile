pipeline {
  agent any

  environment {
    IMAGE_NAME = 'vpstackhub/radioitaliacast-frontend:1.0'
  }

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/vpstackhub/radioitaliacast-frontend.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE_NAME'
        }
      }
    }
    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-key']) {
          sh '''
          ssh -o StrictHostKeyChecking=no ec2-user@13.58.141.188 '
            docker pull $IMAGE_NAME &&
            docker stop radioitaliacast-frontend || true &&
            docker rm radioitaliacast-frontend || true &&
            docker run -d -p 4300:80 --name radioitaliacast-frontend $IMAGE_NAME
          '
          '''
        }
      }
    }
  }
}
