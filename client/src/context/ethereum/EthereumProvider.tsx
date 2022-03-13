import { Web3Provider } from '@ethersproject/providers';
import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';
import { formatEther } from '@ethersproject/units';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ChainType } from 'src/types/ChainType';

interface EthereumState {
  account?: string;
  chainType: ChainType;
  isValidNetwork: boolean;
  hasMetamask(): boolean;
  checkConnection(): boolean;
  connectMetamask(): Promise<void>;
  disconnectMetamask(): void;
  switchChain(chainType: ChainType): Promise<void>;
  balance: string;
  isLoadingBalance: boolean;
  refreshData(): Promise<void>;
}

export const EthereumContext = createContext<EthereumState>({
  chainType: ChainType.Unknown,
  isValidNetwork: false,
  hasMetamask: () => false,
  checkConnection: () => false,
  connectMetamask: () => Promise.resolve(),
  disconnectMetamask: () => ({}),
  switchChain: () => Promise.resolve(),
  balance: '-',
  isLoadingBalance: false,
  refreshData: () => Promise.resolve(),
});

export function useEthereum() {
  const context = useContext(EthereumContext);
  if (!context) {
    throw new Error('useEthereum hook requires EthereumContext');
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export function EthereumProvider({ children }: Props) {
  const [account, setAccount] = useState<string | undefined>();
  const [chainType, setChainType] = useState<ChainType>(ChainType.Unknown);
  const [balance, setBalance] = useState<string>('-');
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false);

  const getChainId = async () => {
    const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
    setChainType(getChainType(chainId));
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on?.('connect', (connectInfo) => setChainType(getChainType(connectInfo.chainId)));
      window.ethereum.on?.('disconnect', (error) => console.info({ error }));
      window.ethereum.on?.('accountsChanged', ([account]) => setAccount(account));
      window.ethereum.on?.('chainChanged', (chainId) => setChainType(getChainType(chainId)));
      window.ethereum.on?.('message', (message) => console.info({ message }));

      void getChainId();
    }
  }, [window.ethereum]);

  const isConnected = () => {
    return !!account;
  };

  const isValidNetwork = useMemo(() => {
    return [ChainType.Rinkeby, ChainType.Ropsten, ChainType.Localhost].includes(chainType);
  }, [chainType]);

  const connectMetamask = async () => {
    if (!window.ethereum) {
      return;
    }

    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(account);
  };

  const disconnectMetamask = () => {
    setAccount(undefined);
  };

  const switchChain = async (chainId: ChainType) => {
    if (!window.ethereum) {
      return;
    }

    await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] });
  };

  const getBalance = async (account?: string) => {
    if (!window.ethereum || !account) {
      return;
    }

    try {
      setIsLoadingBalance(true);
      const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
      const balance = await provider.getBalance(account);
      setBalance(formatEther(balance));
    } catch (error) {
      setBalance('-');
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const refreshData = async () => {
    if (account) {
      await getBalance(account);
    }
  };

  useEffect(() => {
    void refreshData();
  }, [account, chainType]);

  return (
    <EthereumContext.Provider
      value={{
        account,
        chainType,
        isValidNetwork,
        hasMetamask,
        checkConnection: isConnected,
        connectMetamask,
        disconnectMetamask,
        switchChain,
        balance,
        isLoadingBalance,
        refreshData,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
}

function hasMetamask() {
  return !!window.ethereum?.isMetaMask;
}

function getChainType(chainId?: string): ChainType {
  if (Object.values(ChainType).includes(chainId as ChainType)) {
    return chainId as ChainType;
  }
  return ChainType.Unknown;
}
