
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'

resources:
  resumefunction:
    type: 'aws::serverless::function'
    properties:
      handler: functions/resume/index.handler
      runtime: nodejs14.x
      codeuri: .
      events:
        resumeapi:
          type: api
          properties:
            path: /api/v1/resume
            method: get
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

  resumetargetgroup:
    type: 'aws::elasticloadbalancingv2::targetgroup'
    properties:
      name: resumetargetgroup
      protocol: http
      port: 80
      vpcid: !Ref vpcid 
      targettype: lambda
      targets:
        - id: !Ref resumefunction
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

  saveuserdatafunction:
    type: 'aws::serverless::function'
    properties:
      handler: functions/resume/index.handler
      runtime: nodejs14.x
      codeuri: .
      tags:
        project: !Ref appid
      environment:
        USERID: !Ref userid
      events:
        resumeapi:
          type: api
          properties:
            path: /api/v1/saveuserdata
            method: post

  saveuserdatatargetgroup:
    type: 'aws::elasticloadbalancingv2::targetgroup'
    properties:
      name: saveuserdatatargetgroup
      protocol: http
      port: 80
      vpcid: !Ref vpcid
      targettype: lambda
      targets:
        - id: !Ref saveuserdatafunction
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

  readerfunction:
    type: 'aws::serverless::function' 
    properties: 
      handler: functions/reader/index.handler
      runtime: nodejs14.x
      codeuri: .
      events:
        resumeapi:
          type: api
          properties:
            path: /
            method: get
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

  readertargetgroup:
    type: 'aws::elasticloadbalancingv2::targetgroup'
    properties:
      name: readertargetgroup
      protocol: http
      port: 80
      vpcid: !Ref vpcid
      targettype: lambda
      targets:
        - id: !Ref readerfunction 
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
  # application load balancer
  resumealb:
    type: 'aws::elasticloadbalancingv2::loadbalancer'
    properties:
      name: resumealb
      subnets: !Ref subnetids
      securitygroups: !Ref securitygroupsids
      scheme: internet-facing
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

  # http to https listener
  httplistener:
    type: 'aws::elasticloadbalancingv2::listener'
    properties:
      loadbalancerarn: !Ref resumealb
      port: 80
      protocol: http
      defaultactions:
        - type: redirect
          redirectconfig:
            protocol: https
            port: '443'
            statuscode: 'http_301'

  # https listener
  httpslistener:
    type: 'aws::elasticloadbalancingv2::listener'
    properties:
      loadbalancerarn: !Ref resumealb
      port: 443
      protocol: https
      certificates:
        - certificatearn: !Ref certificatearn  
      defaultactions:
        - type: forward
          targetgrouparn: !Ref readertargetgroup 

  # listener rule for /api/v1/*
  apilistenerrule:
    type: 'aws::elasticloadbalancingv2::listenerrule'
    properties:
      listenerarn: !Ref httpslistener
      priority: 1
      conditions:
        - field: path-pattern
          values:
            - /api/v1/*
      actions:
        - type: forward
          targetgrouparn: !Ref resumetargetgroup



Outputs:
  ResumeApi:
    Description: "API Gateway endpoint URL for ResumeApi function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/resume"

  saveUserDataApi:
    Description: "API Gateway endpoint URL for saveUserDataFunction function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/resume"
  
  readerAPI:
    Description: "API Gateway endpoint URL for readerFunction function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/resume"


    changed: [localhost]

TASK [Prepare : fail] **********************************************************

fatal: [localhost]: FAILED! => {

    "changed": false

}

MSG:

{'Message': [{'message': 'Illegal cfn - no Resources', 'type': 'FAIL', 'logical_resource_ids': None}], 'Status': 'Fail'}

PLAY RECAP *********************************************************************

localhost                  : ok=18   changed=8    unreachable=0    failed=1    skipped=15   rescued=0    ignored=0   

localhost                  : ok=18   changed=8    unreachable=0    failed=1    skipped=15   rescued=0    ignored=0   



#$$PLAYBOOK EXECUTION COMPLETED$$#




