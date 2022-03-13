import { Web3Provider } from '@ethersproject/providers';
import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';
import { formatUnits } from '@ethersproject/units';
import { ethers } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useContracts } from 'src/context/contracts/EthereumProvider';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import FiatToken from '../../../../ethereum/artifacts/contracts/FiatToken.sol/FiatToken.json';

interface FiatTokenState {
  balance: string;
  isLoadingBalance: boolean;
  isRequestingToken: boolean;
  isCheckingAlreadyRequested: boolean;
  isAlreadyRequested: boolean;
  requestSome(): Promise<void>;
  checkAllowance(owner: string, spender: string): Promise<any>;
  increaseAllowance(address: string, amount: number): Promise<void>;
  refreshData(): Promise<void>;
}

export const FiatTokenContext = createContext<FiatTokenState>({
  balance: '-',
  isLoadingBalance: false,
  isRequestingToken: false,
  isCheckingAlreadyRequested: false,
  isAlreadyRequested: false,
  requestSome: () => Promise.resolve(),
  checkAllowance: () => Promise.resolve(),
  increaseAllowance: () => Promise.resolve(),
  refreshData: () => Promise.resolve(),
});

export function useFiatToken() {
  const context = useContext(FiatTokenContext);
  if (!context) {
    throw new Error('useEthereum hook requires FiatTokenContext');
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export function FiatTokenProvider({ children }: Props) {
  const { account, chainType, refreshData: refreshEthereumData } = useEthereum();
  const { fiatTokenAddress } = useContracts();

  const [balance, setBalance] = useState<string>('-');
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false);
  const [isRequestingToken, setIsRequestingToken] = useState<boolean>(false);
  const [isCheckingAlreadyRequested, setIsCheckingAlreadyRequested] = useState<boolean>(true);
  const [isAlreadyRequested, setIsAlreadyRequested] = useState<boolean>(false);

  const getBalance = async (account?: string) => {
    if (!window.ethereum || !account) {
      return '-';
    }

    try {
      setIsLoadingBalance(true);
      const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
      const contract = new ethers.Contract(fiatTokenAddress, FiatToken.abi, provider);
      const balance = await contract.balanceOf(account);
      setBalance(formatUnits(balance, 6));
    } catch (error) {
      console.error(error);
      setBalance('-');
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const checkIfRequested = async () => {
    try {
      setIsCheckingAlreadyRequested(true);
      const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
      const contract = new ethers.Contract(fiatTokenAddress, FiatToken.abi, provider);
      const isRequested = await contract.isAlreadyRequested(account);
      setIsAlreadyRequested(isRequested);
    } catch (error) {
      console.error({ error });
    } finally {
      setIsCheckingAlreadyRequested(false);
    }
  };

  const refreshData = async () => {
    if (account) {
      await getBalance(account);
      await checkIfRequested();
    }
  };

  const requestSome = async (account?: string) => {
    if (!window.ethereum || !account) {
      return;
    }

    try {
      setIsRequestingToken(true);
      const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(fiatTokenAddress, FiatToken.abi, signer);

      contract.connect(signer);
      const requestSomeTx = await contract.requestSome();
      await requestSomeTx.wait();

      await refreshEthereumData();
      await refreshData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequestingToken(false);
    }
  };

  const checkAllowance = async (owner: string, spender: string) => {
    const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
    const contract = new ethers.Contract(fiatTokenAddress, FiatToken.abi, provider);
    return contract.allowance(owner, spender);
  };

  const increaseAllowance = async (address: string, amount: number) => {
    const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(fiatTokenAddress, FiatToken.abi, signer);

    contract.connect(signer);
    const increaseAllowanceTx = await contract.increaseAllowance(address, amount);
    await increaseAllowanceTx.wait();

    await refreshEthereumData();
    await refreshData();
  };

  useEffect(() => {
    void refreshData();
  }, [account, chainType]);

  return (
    <FiatTokenContext.Provider
      value={{
        balance,
        isLoadingBalance,
        isRequestingToken,
        isCheckingAlreadyRequested,
        isAlreadyRequested,
        requestSome,
        increaseAllowance,
        checkAllowance,
        refreshData,
      }}
    >
      {children}
    </FiatTokenContext.Provider>
  );
}
