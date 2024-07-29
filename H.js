AWSTemplateFormatVersion: '2010-09-09'
Description: CloudFormation Template for ALB with Lambda functions and routing rules

Resources:
  # Application Load Balancer
  MyALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: my-alb
      Subnets:
        - !Ref PublicSubnet1  # Replace with your public subnet ID
        - !Ref PublicSubnet2  # Replace with your public subnet ID
      SecurityGroups:
        - !Ref ALBSecurityGroup  # Replace with your ALB security group ID
      Scheme: internet-facing
      Type: application
      Tags:
        - Key: Environment
          Value: J6YV

  # HTTP Listener to redirect HTTP traffic to HTTPS
  ALBListenerHTTP:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      DefaultActions:
        - Type: redirect
          RedirectConfig:
            Protocol: HTTPS
            Port: 443
            StatusCode: HTTP_301  # Redirect HTTP to HTTPS
      LoadBalancerArn: !Ref MyALB
      Port: 80
      Protocol: HTTP
      Tags:
        - Key: Environment
          Value: J6YV

  # HTTPS Listener for the ALB
  ALBListenerHTTPS:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      DefaultActions:
        - Type: fixed-response
          FixedResponseConfig:
            StatusCode: 200
            ContentType: text/plain
            MessageBody: Default response
      LoadBalancerArn: !Ref MyALB
      Port: 443
      Protocol: HTTPS
      SslPolicy: ELBSecurityPolicy-2016-08
      Certificates:
        - CertificateArn: !Ref YourSSLCertificateArn  # Replace with your SSL certificate ARN
      Tags:
        - Key: Environment
          Value: J6YV

  # Target Group for Resume Lambda
  ResumeTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: ResumeTargetGroup
      Port: 80
      Protocol: HTTP
      VpcId: !Ref VPCId  # Replace with your VPC ID
      HealthCheckPath: /
      HealthCheckProtocol: HTTP
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 2
      Tags:
        - Key: Environment
          Value: J6YV

  # Target Group for Reader Lambda
  ReaderTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: ReaderTargetGroup
      Port: 80
      Protocol: HTTP
      VpcId: !Ref VPCId  # Replace with your VPC ID
      HealthCheckPath: /
      HealthCheckProtocol: HTTP
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 2
      Tags:
        - Key: Environment
          Value: J6YV

  # Listener Rule for /api/v1 to point to Resume Lambda
  ALBListenerRuleAPI:
    Type: AWS::ElasticLoadBalancingV2::ListenerRule
    Properties:
      Actions:
        - Type: forward
          TargetGroupArn: !Ref ResumeTargetGroup
      Conditions:
        - Field: path-pattern
          PathPatternConfig:
            Values:
              - /api/v1/*
      ListenerArn: !Ref ALBListenerHTTPS
      Priority: 1
      Tags:
        - Key: Environment
          Value: J6YV

  # Default Listener Rule to point to Reader Lambda
  ALBListenerRuleDefault:
    Type: AWS::ElasticLoadBalancingV2::ListenerRule
    Properties:
      Actions:
        - Type: forward
          TargetGroupArn: !Ref ReaderTargetGroup
      Conditions: []
      ListenerArn: !Ref ALBListenerHTTPS
      Priority: 2
      Tags:
        - Key: Environment
          Value: J6YV

  # Lambda function for resume
  ResumeLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      CodeUri: s3://BUCKET-S3/resume-function.zip  # Replace with your S3 bucket and key
      Tags:
        - Key: Project
          Value: J6YV
      Role: !Ref LambdaExecutionRole  # Replace with your Lambda execution role ARN

  # Lambda function for reader
  ReaderLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      CodeUri: s3://BUCKET-S3/reader-function.zip  # Replace with your S3 bucket and key
      Tags:
        - Key: Project
          Value: J6YV
      Role: !Ref LambdaExecutionRole  # Replace with your Lambda execution role ARN

Outputs:
  ALBDNSName:
    Description: "DNS name of the Application Load Balancer"
    Value: !GetAtt MyALB.DNSName

Parameters:
  VPCId:
    Description: "The ID of the VPC"
    Type: AWS::EC2::VPC::Id

  PublicSubnet1:
    Description: "The ID of the first public subnet"
    Type: AWS::EC2::Subnet::Id

  PublicSubnet2:
    Description: "The ID of the second public subnet"
    Type: AWS::EC2::Subnet::Id

  ALBSecurityGroup:
    Description: "The security group for the ALB"
    Type: AWS::EC2::SecurityGroup::Id

  YourSSLCertificateArn:
    Description: "The ARN of the SSL certificate"
    Type: String

  LambdaExecutionRole:
    Description: "IAM role for Lambda execution"
    Type: AWS::IAM::Role::Arn
