Here's a step-by-step guide to create a SAM template that points to your `index.js` handler and sets up an API Gateway event:

1. **Create a SAM Template**:

Create a `template.yaml` file in the root directory (`resume-backend`) with the following content:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Resources:
  HelloWorldFunction:
    Type: 'AWS::Serverless::Function'
    Properties: 
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Events:
        HelloWorldApi:
          Type: Api
          Properties:
            Path: /hello
            Method: get
Outputs:
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello"
```

2. **Create the Lambda Handler**:

Ensure your `functions/resume/index.js` file has the following content:

```javascript
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "hello world!" }),
    };
};
```

3. **Start the SAM Local API Gateway**:

Open a terminal and navigate to the `resume-backend` directory. Run the following command to start the SAM local API Gateway:

```bash
sam local start-api
```

4. **Test the API with Postman**:

Open Postman and create a new GET request to the following URL:

```
http://localhost:3000/hello
```

Send the request. You should receive a response with a JSON object containing the message "hello world!".

By following these steps, you should have a fully functional SAM template pointing to your `index.js` handler with an API Gateway event that triggers the function at the `/hello` endpoint.
