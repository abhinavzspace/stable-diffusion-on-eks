import * as blueprints from '@aws-quickstart/eks-blueprints';
import { Construct } from "constructs";

export interface dcgmExporterAddOnProps extends blueprints.addons.HelmAddOnUserProps {

}

export const defaultProps: blueprints.addons.HelmAddOnProps & dcgmExporterAddOnProps = {
  chart: 'gpu-helm-charts/dcgm-exporter',
  name: 'dcgmExporterAddOn',
  namespace: 'nvidia-device-plugin',
  release: 'dcgmExporter',
  version: '3.1.7',
  repository: 'https://nvidia.github.io/dcgm-exporter/helm-charts'
}

export default class dcgmExporterAddon extends blueprints.addons.HelmAddOn {

  readonly options: dcgmExporterAddOnProps;

  constructor(props: dcgmExporterAddOnProps) {
    super({ ...defaultProps, ...props });
    this.options = this.props as dcgmExporterAddOnProps;
  }

  deploy(clusterInfo: blueprints.ClusterInfo): Promise<Construct> {
    const chart = this.addHelmChart(clusterInfo, {
        nodeSelector: {
          "karpenter.k8s.aws/instance-gpu-manufacturer": "nvidia"
        },
        tolerations: [
          {
            effect: "NoSchedule",
            key: "runtime",
            operator: "Exists"
          },
          {
            effect: "NoSchedule",
            key: "nvidia.com/gpu",
            operator: "Exists"
          },
        ]
      },
      true, true
    );

    return Promise.resolve(chart);
  }
}