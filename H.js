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
        ResumeFunction: resumefunction
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
        ReaderFunction: resumefunction
        UserID: !Ref UserID
        Vsad: !Ref AppID
