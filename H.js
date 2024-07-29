Update the cft.json file with the infrastructure you need to create
You will need to create a resume lambda that points to the resume function zip in S3
You will need to create a reader lambda that points the reader function zip in S3
You will need an application load balancer
In the load balancer one rule will be for anything coming in on port 80 (http) to redirect to port 443 (https)
In the load balancer you will create one rule for anything coming to /api/v1 to point to the resume lambda
In the load balancer you will create one default rule where all other traffic is directed to the reader lambda
All resources must be tagged correctly with J6YV
