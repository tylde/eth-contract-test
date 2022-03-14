import React, { createContext, useContext, useMemo } from 'react';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { ChainType } from 'src/types/ChainType';

type Contracts = {
  fiatTokenAddress: string;
  wrappedTokenAddress: string;
};

interface ContractsState {
  fiatTokenAddress: string;
  wrappedTokenAddress: string;
}

export const ContractsContext = createContext<ContractsState>({
  fiatTokenAddress: '',
  wrappedTokenAddress: '',
});

export function useContracts() {
  const context = useContext(ContractsContext);
  if (!context) {
    throw new Error('useContracts hook requires ContractsContext');
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

const contracts: Record<ChainType, Contracts> = {
  [ChainType.Localhost]: {
    fiatTokenAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    wrappedTokenAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  },
  [ChainType.Rinkeby]: {
    fiatTokenAddress: '0xC264F82e781c619Bc45773BE4190fc781E9E405C',
    wrappedTokenAddress: '0xf25a8B2E62271039603a8Ce3304286D7D5b2e197',
  },
  [ChainType.Ropsten]: {
    fiatTokenAddress: '0x3903ff4b070776418032bEF0f21275fff1CfE08A',
    wrappedTokenAddress: '0x878563199B8E319B24B85df1be7412353AeA14C7',
  },

  [ChainType.Mainnet]: { fiatTokenAddress: '', wrappedTokenAddress: '' },
  [ChainType.Kovan]: { fiatTokenAddress: '', wrappedTokenAddress: '' },
  [ChainType.Goerli]: { fiatTokenAddress: '', wrappedTokenAddress: '' },
  [ChainType.Unknown]: { fiatTokenAddress: '', wrappedTokenAddress: '' },
};

export function ContractsProvider({ children }: Props) {
  const { chainType } = useEthereum();

  const fiatTokenAddress = useMemo(() => contracts[chainType].fiatTokenAddress, [chainType]);
  const wrappedTokenAddress = useMemo(() => contracts[chainType].wrappedTokenAddress, [chainType]);

  return (
    <ContractsContext.Provider value={{ fiatTokenAddress, wrappedTokenAddress }}>{children}</ContractsContext.Provider>
  );
}
