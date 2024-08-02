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
        - Key: "ResumeFunction"
          Value: resumefunction
        - Key: UserID
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID


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
        - Key: "ReaderFunction"
          Value: resumefunction
        - Key: UserID
          Value: !Ref UserID
        - Key: Vsad
          Value: !Ref AppID

  LoadBalance

TASK [LaunchCF : Launch Cloudformation Stack] **********************************



fatal: [localhost]: FAILED! => {

    "changed": true,

    "events": [

        "StackEvent AWS::CloudFormation::Stack GTS-J6YV-VLDP-UPSKILL-SULEMAAN-APP-ALB CREATE_FAILED",

        "StackEvent AWS::CloudFormation::Stack GTS-J6YV-VLDP-UPSKILL-SULEMAAN-APP-ALB CREATE_IN_PROGRESS",

        "StackEvent AWS::CloudFormation::Stack GTS-J6YV-VLDP-UPSKILL-SULEMAAN-APP-ALB CREATE_IN_PROGRESS"

    ],

    "log": [

        "AWS::CloudFormation::Stack GTS-J6YV-VLDP-UPSKILL-SULEMAAN-APP-ALB CREATE_FAILED: Transform AWS::Serverless-2016-10-31 failed with: Invalid Serverless Application Specification document. Number of errors found: 2. Resource with id [ResumeFunction] is invalid. Property 'Tags' should be a map. Resource with id [ReaderFunction] is invalid. Property 'Tags' should be a map."

    ],

    "output": "Stack CREATE failed",

    "stack_outputs": {},

    "stack_resources": []

}

PLAY RECAP *********************************************************************

localhost                  : ok=26   changed=10   unreachable=0    failed=1    skipped=22   rescued=0    ignored=0   

localhost                  : ok=26   changed=10   unreachable=0    failed=1    skipped=22   rescued=0    ignored=0   



#$$PLAYBOOK EXECUTION COMPLETED$$#



[Pipeline] }
