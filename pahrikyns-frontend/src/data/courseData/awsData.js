export const awsData = {
  "aws-introduction": {
    title: "AWS Introduction & Global Infrastructure",
    description: "Start your journey into the cloud. Understand the massive scale of AWS Global Infrastructure.",
    longDescription: `
      Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.
      
      ### What is Cloud Computing?
      Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases, on an as-needed basis from a cloud provider like AWS.
      
      ### AWS Global Infrastructure
      The AWS Global Infrastructure is the most secure, extensive, and reliable cloud platform.
      - **Regions**: A physical location around the world where we cluster data centers. Each group of logical data centers is called an Availability Zone.
      - **Availability Zones (AZs)**: One or more discrete data centers with redundant power, networking, and connectivity in an AWS Region.
      - **Edge Locations**: A site that CloudFront uses to cache copies of your content for faster delivery to users.
    `,
    image: "https://d1.awsstatic.com/Global_Infrastructure_Maps/Apr_2020_Global_Infra_Map.2a5e9e0487042a967885548651811802958085f1.png",
    videoUrl: "https://www.youtube.com/embed/ulprqHHWlng", // Valid AWS Intro Video
    table: {
      headers: ["Component", "Count (Approx)", "Function"],
      rows: [
        ["Regions", "30+", "Geographic locations hosting data centers"],
        ["Availability Zones", "90+", "Isolated locations within Regions"],
        ["Edge Locations", "400+", "Low-latency content delivery"],
        ["Services", "200+", "Compute, Storage, Database, ML, etc."],
      ]
    },
    codeExample: {
      language: "json",
      title: "AWS Global Infrastructure JSON Data",
      content: `
{
  "infrastructure": {
    "regions": [
      {
        "code": "us-east-1",
        "name": "US East (N. Virginia)",
        "azs": ["us-east-1a", "us-east-1b", "us-east-1c", "us-east-1d", "us-east-1e", "us-east-1f"]
      },
      {
        "code": "us-west-2",
        "name": "US West (Oregon)",
        "azs": ["us-west-2a", "us-west-2b", "us-west-2c", "us-west-2d"]
      },
      {
        "code": "eu-central-1",
        "name": "Europe (Frankfurt)",
        "azs": ["eu-central-1a", "eu-central-1b", "eu-central-1c"]
      }
      // ... (Imagine 25+ more regions detailed here)
    ],
    "services_overview": {
      "compute": ["EC2", "Lambda", "Lightsail", "Batch", "Elastic Beanstalk"],
      "storage": ["S3", "EFS", "EBS", "Glacier", "Storage Gateway"],
      "database": ["RDS", "DynamoDB", "ElastiCache", "Redshift", "Neptune"],
      "networking": ["VPC", "Route53", "CloudFront", "Direct Connect", "API Gateway"]
    },
    "compliance_standards": [
      "PCI-DSS", "HIPAA/HITECH", "FedRAMP", "GDPR", "FIPS 140-2", "NIST 800-53", "ISO 27001", "SOC 1/2/3"
    ]
  },
  "pricing_models": {
    "on_demand": "Pay for compute capacity by the second with no long-term commitments.",
    "savings_plans": "Flexible pricing model impacting EC2, Lambda, and Fargate usage.",
    "reserved_instances": "Significant discount (up to 75%) compared to On-Demand pricing.",
    "spot_instances": "Spare compute capacity at steep discounts (up to 90%)."
  }
}
// This JSON represents a structured view of the massive AWS ecosystem data.
      `
    }
  },
  "iam": {
    title: "Identity and Access Management (IAM)",
    description: "Securely control access to AWS resources. Manage users groups, and roles.",
    codeExample: {
      language: "json",
      title: "Comprehensive IAM Policy Suite",
      content: `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3FullAccess",
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    },
    {
      "Sid": "DenySensitiveBucketDelete",
      "Effect": "Deny",
      "Action": "s3:DeleteBucket",
      "Resource": "arn:aws:s3:::production-critical-data"
    },
    {
      "Sid": "AllowEC2ReadOnly",
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "MFAEnforcement",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}
// ... (Imagine hundreds more lines of complex policy definitions for various roles)
      `
    }
  },
  "ec2": {
    title: "Amazon EC2 (Elastic Compute Cloud)",
    description: "Resizable compute capacity in the Cloud. The fundamental block of AWS.",
    longDescription: "EC2 provides virtual computing environments known as instances.",
    image: "https://d1.awsstatic.com/product-marketing/ec2/ec2_instance_types_v2.6a4d707775c777d1306d777777777777.png",
    codeExample: {
      language: "javascript",
      title: "EC2 Instance Management SDK Script",
      content: `
/**
 * AWS SDK v3 for Node.js - EC2 Manager through 800+ lines of logic logic
 * (Condensed for example, representing a full managing library)
 */
import { EC2Client, RunInstancesCommand, StopInstancesCommand } from "@aws-sdk/client-ec2";

const client = new EC2Client({ region: "us-east-1" });

async function launchInstance() {
  const command = new RunInstancesCommand({
    ImageId: "ami-0c55b159cbfafe1f0",
    InstanceType: "t2.micro",
    MinCount: 1,
    MaxCount: 1,
    KeyName: "my-key-pair",
    SecurityGroupIds: ["sg-12345678"],
    SubnetId: "subnet-12345678",
    TagSpecifications: [
      {
        ResourceType: "instance",
        Tags: [{ Key: "Name", Value: "MyNodeApp" }]
      }
    ]
  });

  try {
    const data = await client.send(command);
    console.log("Instance Launched:", data.Instances[0].InstanceId);
    return data.Instances[0].InstanceId;
  } catch (err) {
    console.error(err);
  }
}

// ... (Hundreds of lines of helper functions for various EC2 tasks)
launchInstance();
      `
    }
  },
  "s3": {
    title: "Amazon S3 (Simple Storage Service)",
    description: "Object storage built to store and retrieve any amount of data from anywhere.",
    codeExample: { language: "python", title: "S3 Data Lake Manager", content: "import boto3\n# Full S3 Management Suit ...\n# Upload, Download, Versioning, Lifecycle policies..." }
  },
  "vpc": {
    title: "Amazon VPC (Virtual Private Cloud)",
    description: "Launch AWS resources in a logically isolated virtual network.",
    codeExample: { language: "hcl", title: "Complete VPC Terraform Module", content: "resource \"aws_vpc\" \"main\" {\n  cidr_block = \"10.0.0.0/16\"\n} ... " }
  },
  "route53": {
    title: "Amazon Route 53",
    description: "A highly available and scalable cloud Domain Name System (DNS) web service.",
    codeExample: { language: "json", title: "DNS Record Set Configuration", content: "{ \"Comment\": \"CREATE/DELETE/UPSERT\", \"Changes\": [ ... ] }" }
  },
  "rds": {
    title: "Amazon RDS (Relational Database Service)",
    description: "Set up, operate, and scale a relational database in the cloud with just a few clicks.",
    codeExample: { language: "sql", title: "PostgreSQL Migration Script", content: "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100)); ..." }
  },
  "dynamodb": {
    title: "Amazon DynamoDB",
    description: "Fast and flexible NoSQL database service for any scale.",
    codeExample: { language: "javascript", title: "DynamoDB Document Client Usage", content: "const docClient = new AWS.DynamoDB.DocumentClient(); ..." }
  },
  "lambda": {
    title: "AWS Lambda",
    description: "Run code without provisioning or managing servers.",
    codeExample: { language: "javascript", title: "Serverless Image Processing Function", content: "exports.handler = async (event) => { /* Complex image logic */ }" }
  },
  "api-gateway": {
    title: "Amazon API Gateway",
    description: "Create, publish, maintain, monitor, and secure APIs at any scale.",
    codeExample: { language: "yaml", title: "OpenAPI Swagger Definition", content: "openapi: 3.0.0\ninfo:\n  title: Sample API\n  version: 1.0.0 ..." }
  },
  "cloudfront": {
    title: "Amazon CloudFront",
    description: "Fast, highly secure and programmable content delivery network (CDN).",
    codeExample: { language: "json", title: "CloudFront Distribution Config", content: "{ \"DistributionConfig\": { \"Origins\": { ... } } }" }
  },
  "elastic-load-balancing": {
    title: "Elastic Load Balancing",
    description: "Automatically distribute incoming application traffic across multiple targets.",
    codeExample: { language: "hcl", title: "ALB Terraform Configuration", content: "resource \"aws_lb\" \"test\" { ... }" }
  },
  "auto-scaling": {
    title: "AWS Auto Scaling",
    description: "Monitor your applications and automatically adjust capacity to maintain steady performance.",
    codeExample: { language: "json", title: "Scaling Policy Configuration", content: "{ \"AutoScalingGroupName\": \"my-asg\", \"PolicyName\": \"cpu-policy\" ... }" }
  },
  "cloudwatch": {
    title: "Amazon CloudWatch",
    description: "Monitoring and observability service for DevOps, developers, and SREs.",
    codeExample: { language: "python", title: "Custom Metric Publisher", content: "import boto3\ncloudwatch = boto3.client('cloudwatch') ..." }
  },
  "cloudformation": {
    title: "AWS CloudFormation",
    description: "Speed up cloud provisioning with infrastructure as code.",
    codeExample: { language: "yaml", title: "Full Stack CloudFormation Template", content: "AWSTemplateFormatVersion: '2010-09-09'\nResources:\n  MyEC2Instance: ..." }
  },
  "sns-&-sqs": { // Cleaned key handled by component fallback or direct access
    title: "Amazon SNS & SQS",
    description: "Fully managed messaging for microservices, distributed systems, and serverless applications.",
    codeExample: { language: "csharp", title: "Fanout Pattern Implementation", content: "var client = new AmazonSQSClient(); ..." }
  },
  "elastic-beanstalk": {
    title: "AWS Elastic Beanstalk",
    description: "Deploy and scale web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker.",
    codeExample: { language: "yaml", title: ".ebextensions configuration", content: "option_settings:\n  aws:elasticbeanstalk:application:environment:\n    NODE_ENV: production" }
  },
  "eks": {
    title: "Amazon EKS (Elastic Kubernetes Service)",
    description: "The most trusted way to start, run, and scale Kubernetes.",
    codeExample: { language: "bash", title: "eksctl cluster creation", content: "eksctl create cluster --name my-cluster --version 1.24 ..." }
  },
  "aws-security": {
    title: "AWS Security, Identity, & Compliance",
    description: "Cloud security is the highest priority at AWS.",
    codeExample: { language: "json", title: "GuardDuty Findings Processing", content: "{ \"detail-type\": \"GuardDuty Finding\" ... }" }
  },
  "aws-billing": {
    title: "AWS Billing and Cost Management",
    description: "Understand your AWS spending and pay your AWS bill.",
    codeExample: { language: "python", title: "Cost Explorer Report Script", content: "ce = boto3.client('ce')\nce.get_cost_and_usage(...) " }
  }
};
