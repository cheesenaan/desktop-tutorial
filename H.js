
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
    "
    
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


in s3 bucket in /vldp/functions/ i have resume.zip and reader.zip
these are my packages lambdas
Update the cft.json file with the infrastructure you need to create
You will need to create a resume lambda that points to the resume function zip in S3
You will need to create a reader lambda that points the reader function zip in S3
You will need an application load balancer
In the load balancer one rule will be for anything coming in on port 80 (http) to redirect to port 443 (https)
In the load balancer you will create one rule for anything coming to /api/v1 to point to the resume lambda
In the load balancer you will create one default rule where all other traffic is directed to the reader lambda
All resources must be tagged correctly with J6YV
 
