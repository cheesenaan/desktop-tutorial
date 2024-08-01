
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
      SslPolicy: "ELBSecurityPolicy-TLS-1-2-2017-01"
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

TASK [Prepare : Run CFN-NAG validation on the main Template for s3 resource type] ***



changed: [localhost]

TASK [Prepare : fail] **********************************************************

fatal: [localhost]: FAILED! => {

    "changed": false

}

MSG:

{'Message': [{'message': 'Application Load Balancers must have SSL Policy with name ELBSecurityPolicy-TLS-1-2-2017-01', 'type': 'FAIL', 'logical_resource_ids': ['HTTPSListener']}, {'message': 'The tag - Name is mandatory for the resource', 'type': 'FAIL', 'logical_resource_ids': ['LoadBalancer']}], 'Status': 'Fail'}

PLAY RECAP *********************************************************************

localhost                  : ok=18   changed=8    unreachable=0    failed=1    skipped=15   rescued=0    ignored=0   

localhost                  : ok=18   changed=8    unreachable=0    failed=1    skipped=15   rescued=0    ignored=0   

#$$PLAYBOOK EXECUTION COMPLETED$$#



[Pipeline] }

[Pipeline] // script

[Pipeline] }

[Pipeline] // stage

[Pipeline] }

[Pipeline] // withEnv

[Pipeline] }

[Pipeline] // withEnv

[Pipeline] }

[Pipeline] // node

[Pipeline] End of Pipeline

ERROR: Playbook Execution Failed.
