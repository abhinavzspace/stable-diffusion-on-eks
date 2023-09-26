# Extensibility

## Create an SQS Subscription to an output SNS topic
In CloudFormation (CDK) outputs, locate the corresponding value for `sdNotificationOutputOutput` and make a note of it.

In the same AWS region, navigate to the SQS service in the AWS Management Console. Click on `Create queue` in the upper right corner, and select `Standard` as the `Type`. Under `access policy`, choose the `Advanced` method, and input the following JSON:
```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "sns.amazonaws.com"
      },
      "Action": "sqs:SendMessage",
      "Resource": "arn:aws:sqs:<REGION>:<ACCOUNT_ID>:<SQS_NAME>",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "<sdNotificationOutputOutput ARN>"
        }
      }
    }
  ]
}
```
Keep the other configurations unchanged, and click `Create queue` in the lower right corner.

After creating the queue, you can see the newly created queue in the SQS control panel. Click on the queue to access its details page. Under `SNS subscriptions`, click `Subscribe to Amazon SNS topic` and select the SNS topic ARN corresponding to `sdNotificationOutputOutput`.

Here, you have successfully created an SQS subscription to the output SNS topic. You can refer to the [boto3 SDK](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/sqs-example-sending-receiving-msgs.html) or the [AWS documentation](https://docs.aws.amazon.com/zh_cn/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html) for instructions on how to retrieve messages.