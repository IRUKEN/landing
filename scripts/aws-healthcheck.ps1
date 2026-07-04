param(
  [string]$Profile = "dev-erni",
  [string]$Region = "us-east-1"
)

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true

function Clear-BrokenProxyEnv {
  $proxyVars = @(
    "HTTP_PROXY",
    "HTTPS_PROXY",
    "ALL_PROXY",
    "GIT_HTTP_PROXY",
    "GIT_HTTPS_PROXY"
  )

  foreach ($name in $proxyVars) {
    if ((Test-Path "Env:$name") -and ((Get-Item "Env:$name").Value -eq "http://127.0.0.1:9")) {
      Remove-Item "Env:$name"
    }
  }
}

function Invoke-AwsText {
  param([string[]]$AwsArgs)

  & aws @AwsArgs --profile $Profile --output text
}

function Invoke-AwsJson {
  param([string[]]$AwsArgs)

  & aws @AwsArgs --profile $Profile --output json | ConvertFrom-Json
}

function Read-Count {
  param(
    [string]$Name,
    [string[]]$AwsArgs
  )

  try {
    $value = Invoke-AwsText -AwsArgs $AwsArgs
    [PSCustomObject]@{
      Check = $Name
      Status = "OK"
      Result = ($value | Out-String).Trim()
    }
  }
  catch {
    [PSCustomObject]@{
      Check = $Name
      Status = "FAIL"
      Result = $_.Exception.Message
    }
  }
}

Clear-BrokenProxyEnv

Write-Host "AWS healthcheck"
Write-Host "Profile: $Profile"
Write-Host "Region:  $Region"
Write-Host ""

try {
  $identity = Invoke-AwsJson -AwsArgs @("sts", "get-caller-identity")
}
catch {
  Write-Error "Could not read AWS identity. Run: aws sso login --profile $Profile"
  exit 1
}

Write-Host "Identity"
Write-Host "Account: $($identity.Account)"
Write-Host "Arn:     $($identity.Arn)"
Write-Host ""

$checks = @(
  (Read-Count -Name "Regions" -AwsArgs @("ec2", "describe-regions", "--all-regions", "--query", "length(Regions[])")),
  (Read-Count -Name "S3 buckets" -AwsArgs @("s3api", "list-buckets", "--query", "length(Buckets[])")),
  (Read-Count -Name "IAM summary" -AwsArgs @("iam", "get-account-summary", "--query", "SummaryMap.AccountMFAEnabled")),
  (Read-Count -Name "EC2 instances" -AwsArgs @("ec2", "describe-instances", "--region", $Region, "--query", "length(Reservations[].Instances[])")),
  (Read-Count -Name "Lambda functions" -AwsArgs @("lambda", "list-functions", "--region", $Region, "--query", "length(Functions[])")),
  (Read-Count -Name "CloudFormation stacks" -AwsArgs @("cloudformation", "list-stacks", "--region", $Region, "--query", "length(StackSummaries[])")),
  (Read-Count -Name "Secrets Manager secrets" -AwsArgs @("secretsmanager", "list-secrets", "--region", $Region, "--max-results", "1", "--query", "length(SecretList[])")),
  (Read-Count -Name "SSM parameters" -AwsArgs @("ssm", "describe-parameters", "--region", $Region, "--max-results", "1", "--query", "length(Parameters[])")),
  (Read-Count -Name "ECR repositories" -AwsArgs @("ecr", "describe-repositories", "--region", $Region, "--query", "length(repositories[])")),
  (Read-Count -Name "RDS instances" -AwsArgs @("rds", "describe-db-instances", "--region", $Region, "--query", "length(DBInstances[])")),
  (Read-Count -Name "ECS clusters" -AwsArgs @("ecs", "list-clusters", "--region", $Region, "--query", "length(clusterArns[])")),
  (Read-Count -Name "EKS clusters" -AwsArgs @("eks", "list-clusters", "--region", $Region, "--query", "length(clusters[])"))
)

$checks | Format-Table -AutoSize

if ($checks.Status -contains "FAIL") {
  exit 2
}
