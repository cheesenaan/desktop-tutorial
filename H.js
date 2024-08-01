
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
        Name: "ResumeFunction"
        UserID: !Ref UserID
        Vsad: !Ref AppID

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
        Name: "ReaderFunction"
        UserID: !Ref UserID
        Vsad: !Ref AppID

  LoadBalancer:
    Type: 'AWS::ElasticLoadBalancingV2::LoadBalancer'
    Properties:
      Name: MyApplicationLoadBalancer
      Subnets: !Ref SubnetIds
      SecurityGroups: !Ref SecurityGroupsIds
      Scheme: "internal"
      LoadBalancerAttributes:
        - Key: idle_timeout.timeout_seconds
          Value: '60'
      Tags:
        - Key: Name
          Value: MyApplicationLoadBalancer
        - Key: Vsad
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
      SslPolicy: "ELBSecurityPolicy-TLS-1-2-2017-01"
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


            AWS::CloudFormation::Stack GTS-J6YV-VLDP-UPSKILL-SULEMAAN-APP-ALB CREATE_FAILED: The following resource(s) failed to create: [ResumeFunctionRole, ReaderFunctionRole]. ",

        "AWS::IAM::Role ReaderFunctionRole CREATE_FAILED: Resource handler returned message: \"Encountered a permissions error performing a tagging operation, please add required tag permissions. See https://repost.aws/knowledge-center/cloudformation-tagging-permission-error for how to resolve. 

            because no identity-based policy allows the iam:CreateRole action (Service: Iam, Status Code: 403,
