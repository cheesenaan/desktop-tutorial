resources:
  # application load balancer
  myalb:
    type: aws::elasticloadbalancingv2::loadbalancer
    properties:
      subnets:
        - !ref publicsubnet1
        - !ref publicsubnet2
      securitygroups:
        - !ref albsecuritygroup
      type: application

  # rule will be for anything coming in on port 80 (http) to redirect to port 443 (https)
  alblistener:
    type: aws::elasticloadbalancingv2::listener
    properties:
      loadbalancerarn: !ref myalb
      port: 80
      protocol: http
      defaultactions:
        - type: redirect
          redirectconfig:
            protocol: https
            port: 443
            statuscode: http_301

  
# rule for anything coming to /api/v1 to point to the resume lambda
ResumeLambda": {
        "Type": "AWS::Serverless::Function",
        "Properties": {
          "Handler": "index.handler",
          "Runtime": "nodejs14.x",
          "CodeUri": "s3://BUCKET-S3/resume-function.zip",
          "Tags": {
            "Project": "j6yv"
          }
        }


  # default rule where all other traffic is directed to the reader lambda



# this is the resume lambda

  # this is the reader lambda
  "ReaderLambda": {
  "Type": "AWS::Serverless::Function",
  "Properties": {
    "Handler": "index.handler",
    "Runtime": "nodejs14.x",
    "CodeUri": "s3://BUCKET-S3/reader-function.zip",
    "Tags": {
      "Project": "j6yv"
    }
  }
}




# Replace the following placeholders:
# - PublicSubnet1, PublicSubnet2: IDs of your public subnets.
# - ALBSecurityGroup: Security group for the ALB.
# - YourSSLCertificateArn: ARN of your SSL certificate in ACM.
# - YourTargetGroup:  ARN of the target group for your application.
