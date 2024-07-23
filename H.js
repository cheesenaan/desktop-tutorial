
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'

Resources:
  HelloWorldFunction:
    Type: 'AWS::Serverless::Function' # this creates a lambda
    Properties: 
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Events:
        HelloWorldApi:
          Type: Api
          Properties:
            Path: /api/v2/hello
            Method: get
  
  HomeFunction:
    Type: 'AWS::Serverless::Function' # this creates a lambda
    Properties: 
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Events:
        HomeApi:
          Type: Api
          Properties:
            Path: /api/v2/home
            Method: get

  ResumeFunction:
    Type: 'AWS::Serverless::Function' # this creates a lambda
    Properties: 
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Events:
        ResumeApi:
          Type: Api
          Properties:
            Path: /api/v2/resume
            Method: get

  saveUserDataFunction:
    Type: 'AWS::Serverless::Function' # this creates a lambda
    Properties: 
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Events:
        ResumeApi:
          Type: Api
          Properties:
            Path: /api/v2/saveUserData
            Method: post


Outputs:
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello"
  
  HomeApi:
    Description: "API Gateway endpoint URL for HomeApi function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/home"

  ResumeApi:
    Description: "API Gateway endpoint URL for ResumeApi function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/resume"

  saveUserDataApi:
    Description: "API Gateway endpoint URL for saveUserDataFunction function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/resume"



[sulefa8@10-119-224-181 sulefa8]$ sam local start-api
Error: Template file not found at /j6yv-workspace/sulefa8/template.yml
