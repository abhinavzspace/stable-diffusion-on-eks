# Stable diffusion on EKS deployment

## Environment requirements:

1. At least one VPC is available.
2. At least 3 EIPs available.
3. G4dn/G5 on-demand/spot instances have sufficient quota.

## Install:

1. Import notebook-deploy.yml stack
2. Follow the instructions in deploy.ipynb.

## Manual configuration:

1. config.yaml: For configuration, please refer to sample/config.yaml. For explanation of specific configuration parameters, please refer to docs/configuration.md.
2. down.csv: down.csv file in the tools/S3uploader directory, edit the model download address
