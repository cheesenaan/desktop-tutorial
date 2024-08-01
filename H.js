AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'

Parameters:
  AppID:
    Description: The 4-character alpha-numeric ApplID code from VAST-APM
    Type: String
    AllowedPattern: '[A-Z0-9]{4}'
    
  UserID:
    Description: The domain id of the resource owner
    Type: String
    MinLength: '1'
    
  Role:
    Description: The role of the instances that will be deployed
    Type: String
    AllowedValues:
      - App
      - DB
      - Web
    Default: App
  CertificateArn:
    Type: String
    
  SecurityGroupsIds:
    Type: List<AWS::EC2::SecurityGroup::Id>
    
  VpcId:
    Type: AWS::EC2::VPC::Id
    
  SubnetIds:
    Type: List<AWS::EC2::Subnet::Id>
    
  S3Bucket:
    Type: String
    Description: S3 bucket where the Lambda code is stored
    
  S3Static:
    Type: String
    Description: S3 key for the READER Lambda code zip file
    
  DBHost:
    Type: String
    Description: Database host URL
    
  DBUser:
    Type: String
    Description: Database user
    
  DBPassword:
    Type: String
    Description: Database password
    NoEcho: true
    
  DBName:
    Type: String
    Description: Database name

Resources:
  ResumeFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      CodeUri:
        Bucket: !Ref S3Bucket
        Key: vldp/functions/resume.zip
      Environment:
        Variables:
          DB_HOST: !Ref DBHost
          DB_USER: !Ref DBUser
          DB_PASSWORD: !Ref DBPassword
          DB_NAME: !Ref DBName
      VpcConfig:
        SecurityGroupIds: !Ref SecurityGroupsIds
        SubnetIds: !Ref SubnetIds
      Tags:
        AppID: !Ref AppID
        UserID: !Ref UserID
        Role: !Ref Role

  ReaderFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      CodeUri:
        Bucket: !Ref S3Bucket
        Key: vldp/functions/reader.zip
      Environment:
        Variables:
          DB_HOST: !Ref DBHost
          DB_USER: !Ref DBUser
          DB_PASSWORD: !Ref DBPassword
          DB_NAME: !Ref DBName
      VpcConfig:
        SecurityGroupIds: !Ref SecurityGroupsIds
        SubnetIds: !Ref SubnetIds
      Tags:
        AppID: !Ref AppID
        UserID: !Ref UserID
        Role: !Ref Role

  LoadBalancer:
    Type: 'AWS::ElasticLoadBalancingV2::LoadBalancer'
    Properties:
      Name: MyApplicationLoadBalancer
      Subnets: !Ref SubnetIds
      SecurityGroups: !Ref SecurityGroupsIds
      Scheme: internet-facing
      LoadBalancerAttributes:
        - Key: idle_timeout.timeout_seconds
          Value: '60'
      Tags:
        - Key: AppID
          Value: !Ref AppID
        - Key: UserID
          Value: !Ref UserID
        - Key: Role
          Value: !Ref Role

  HTTPSListener:
    Type: 'AWS::ElasticLoadBalancingV2::Listener'
    Properties:
      LoadBalancerArn: !Ref LoadBalancer
      Port: '443'
      Protocol: HTTPS
      Certificates:
        - CertificateArn: !Ref CertificateArn
      DefaultActions:
        - Type: fixed-response
          FixedResponseConfig:
            StatusCode: '404'
            ContentType: text/plain
            MessageBody: "Not Found"

  HTTPListener:
    Type: 'AWS::ElasticLoadBalancingV2::Listener'
    Properties:
      LoadBalancerArn: !Ref LoadBalancer
      Port: '80'
      Protocol: HTTP
      DefaultActions:
        - Type: redirect
          RedirectConfig:
            Protocol: HTTPS
            Port: '443'
            StatusCode: HTTP_301

  APIListenerRule:
    Type: 'AWS::ElasticLoadBalancingV2::ListenerRule'
    Properties:
      ListenerArn: !Ref HTTPSListener
      Conditions:
        - Field: path-pattern
          Values:
            - /api/v1/*
      Priority: 1
      Actions:
        - Type: forward
          TargetGroupArn: !Ref ResumeTargetGroup

  DefaultListenerRule:
    Type: 'AWS::ElasticLoadBalancingV2::ListenerRule'
    Properties:
      ListenerArn: !Ref HTTPSListener
      Conditions:
        - Field: path-pattern
          Values:
            - /*
      Priority: 2
      Actions:
        - Type: forward
          TargetGroupArn: !Ref ReaderTargetGroup

  ResumeTargetGroup:
    Type: 'AWS::ElasticLoadBalancingV2::TargetGroup'
    Properties:
      Name: resume-target-group
      TargetType: lambda
      Targets:
        - Id: !GetAtt ResumeFunction.Arn

  ReaderTargetGroup:
    Type: 'AWS::ElasticLoadBalancingV2::TargetGroup'
    Properties:
      Name: reader-target-group
      TargetType: lambda
      Targets:
        - Id: !GetAtt ReaderFunction.Arn

Outputs:
  ResumeFunctionArn:
    Description: "ARN of the resume Lambda function"
    Value: !GetAtt ResumeFunction.Arn

  ReaderFunctionArn:
    Description: "ARN of the reader Lambda function"
    Value: !GetAtt ReaderFunction.Arn

  LoadBalancerDNSName:
    Description: "DNS name of the load balancer"
    Value: !GetAtt LoadBalancer.DNSName
