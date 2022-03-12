export enum ChainType {
  Mainnet = '0x1',
  Ropsten = '0x3',
  Rinkeby = '0x4',
  Goerli = '0x5',
  Kovan = '0x2a',
  Unknown = '0x0',
}

export function getNetworkName(chainType?: ChainType): string {
  switch (chainType) {
    case ChainType.Mainnet:
      return 'Mainnet';
    case ChainType.Ropsten:
      return 'Ropsten';
    case ChainType.Rinkeby:
      return 'Rinkeby';
    case ChainType.Goerli:
      return 'Goerli';
    case ChainType.Kovan:
      return 'Kovan';
    case ChainType.Unknown:
      return 'Unknown';
    default:
      return '?';
  }
}
