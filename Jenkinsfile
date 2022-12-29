pipeline {
  agent any

    environment {
        DOCKER_NAME= "da2-fe"
        DOCKER_IMAGE = "$DOCKER_NAME"
        DOCKER_TAG="${GIT_COMMIT.substring(0,7)}"
    }

  stages {
      stage('Checkout') {
          steps {
             checkout scm
          }
      }
      stage('Build image') {
          environment {
                DOCKER_TAG="${GIT_COMMIT.substring(0,7)}"
            }
          steps {
             echo "---------BUILD IMAGE-----------"
             sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG ."
            //  echo "---------PUSH IMAGE TO REGISTRY-----------"
            //  sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
          }
      }
  }
  post {
        success {
            echo "SUCCESSFUL"
        }
        failure {
            echo "FAILED"
        }
    }
}
