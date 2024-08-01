

Resources:
  ResumeFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Events:
        ResumeApi:
          Type: Api
          Properties:
            Path: /api/v1/resume
            Method: get
      Tags:
        - Key: UserID
          Value: !Ref UserID
        - Key: Userid
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID
        - Key: Name
          Value: !Ref AWS::StackName
        - Key: Role
          Value: !Ref Role

  ResumeTargetGroup:
    Type: 'AWS::ElasticLoadBalancingV2::TargetGroup'
    Properties:
      Name: resumetargetgroup
      Protocol: HTTP
      Port: 80
      VpcId: !Ref VpcId 
      TargetType: lambda
      Targets:
        - Id: !Ref ResumeFunction
      Tags:
        - Key: UserID
          Value: !Ref UserID
        - Key: Userid
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID
        - Key: Name
          Value: !Ref AWS::StackName
        - Key: Role
          Value: !Ref Role

  SaveUserDataFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Tags:
        project: !Ref AppID
      Environment:
        Variables:
          USERID: !Ref UserID
      Events:
        ResumeApi:
          Type: Api
          Properties:
            Path: /api/v1/saveuserdata
            Method: post

  SaveUserDataTargetGroup:
    Type: 'AWS::ElasticLoadBalancingV2::TargetGroup'
    Properties:
      Name: saveuserdatatargetgroup
      Protocol: HTTP
      Port: 80
      VpcId: !Ref VpcId
      TargetType: lambda
      Targets:
        - Id: !Ref SaveUserDataFunction
      Tags:
        - Key: UserID
          Value: !Ref UserID
        - Key: Userid
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID
        - Key: Name
          Value: !Ref AWS::StackName
        - Key: Role
          Value: !Ref Role

  ReaderFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: functions/reader/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Events:
        ResumeApi:
          Type: Api
          Properties:
            Path: /
            Method: get
      Tags:
        - Key: UserID
          Value: !Ref UserID
        - Key: Userid
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID
        - Key: Name
          Value: !Ref AWS::StackName
        - Key: Role
          Value: !Ref Role

  ReaderTargetGroup:
    Type: 'AWS::ElasticLoadBalancingV2::TargetGroup'
    Properties:
      Name: readertargetgroup
      Protocol: HTTP
      Port: 80
      VpcId: !Ref VpcId
      TargetType: lambda
      Targets:
        - Id: !Ref ReaderFunction
      Tags:
        - Key: UserID
          Value: !Ref UserID
        - Key: Userid
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID
        - Key: Name
          Value: !Ref AWS::StackName
        - Key: Role
          Value: !Ref Role

  ResumeALB:
    Type: 'AWS::ElasticLoadBalancingV2::LoadBalancer'
    Properties:
      Name: resumealb
      Subnets: !Ref SubnetIds
      SecurityGroups: !Ref SecurityGroupIds
      Scheme: internet-facing
      Tags:
        - Key: UserID
          Value: !Ref UserID
        - Key: Userid
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID
        - Key: Name
          Value: !Ref AWS::StackName
        - Key: Role
          Value: !Ref Role

  HttpListener:
    Type: 'AWS::ElasticLoadBalancingV2::Listener'
    Properties:
      LoadBalancerArn: !Ref ResumeALB
      Port: 80
      Protocol: HTTP
      DefaultActions:
        - Type: redirect
          RedirectConfig:
            Protocol: HTTPS
            Port: '443'
            StatusCode: HTTP_301

  HttpsListener:
    Type: 'AWS::ElasticLoadBalancingV2::Listener'
    Properties:
      LoadBalancerArn: !Ref ResumeALB
      Port: 443
      Protocol: HTTPS
      Certificates:
        - CertificateArn: !Ref CertificateArn  
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref ReaderTargetGroup

  ApiListenerRule:
    Type: 'AWS::ElasticLoadBalancingV2::ListenerRule'
    Properties:
      ListenerArn: !Ref HttpsListener
      Priority: 1
      Conditions:
        - Field: path-pattern
          Values:
            - /api/v1/*
      Actions:
        - Type: forward
          TargetGroupArn: !Ref ResumeTargetGroup

Outputs:
  ResumeApi:
    Description: "API Gateway endpoint URL for ResumeApi function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/api/v1/resume"

  SaveUserDataApi:
    Description: "API Gateway endpoint URL for SaveUserDataFunction function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/api/v1/saveuserdata"
  
  ReaderAPI:
    Description: "API Gateway endpoint URL for ReaderFunction function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/"
