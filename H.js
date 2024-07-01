stages:
  - deploy
  - verify

variables:
  GIT_STRATEGY: fetch # Ensures that the repository is fetched before each job

before_script:
  - git checkout sulemaan-test # Checkout the correct branch

deploy:
  stage: deploy
  script:
    - sh deploy.txt
  only:
    - sulemaan-test

verify:
  stage: verify
  script:
    - sh verify.txt
  only:
    - sulemaan-test

after_script:
  - echo 'Deployment and verification successful.'

# Handle failure scenarios
failure:
  stage: .post
  script:
    - echo 'Deployment or verification failed.'
  when: on_failure
  only:
    - sulemaan-test
