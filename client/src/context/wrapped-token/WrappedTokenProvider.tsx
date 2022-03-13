import { Web3Provider } from '@ethersproject/providers';
import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';
import { formatUnits } from '@ethersproject/units';
import { ethers } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useContracts } from 'src/context/contracts/EthereumProvider';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { useFiatToken } from 'src/context/fiat-token/FiatTokenProvider';
import WrappedToken from '../../../../ethereum/artifacts/contracts/WrappedToken.sol/WrappedToken.json';

interface WrappedTokenState {
  balance: string;
  isLoadingBalance: boolean;
  deposit(account: string, ammount: number): Promise<void>;
  isDepositing: boolean;
  withdraw(account: string, ammount: number): Promise<void>;
  isWithdrawing: boolean;
}

export const WrappedTokenContext = createContext<WrappedTokenState>({
  balance: '-',
  isLoadingBalance: false,
  deposit: () => Promise.resolve(),
  isDepositing: false,
  withdraw: () => Promise.resolve(),
  isWithdrawing: false,
});

export function useWrappedToken() {
  const context = useContext(WrappedTokenContext);
  if (!context) {
    throw new Error('useEthereum hook requires WrappedTokenContext');
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export function WrappedTokenProvider({ children }: Props) {
  const { account, chainType, refreshData: refreshEthereumData } = useEthereum();
  const { wrappedTokenAddress } = useContracts();
  const { checkAllowance, increaseAllowance, refreshData: refreshFiatData } = useFiatToken();

  const [balance, setBalance] = useState<string>('-');
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

  const getBalance = async (account?: string) => {
    if (!window.ethereum || !account) {
      return '-';
    }

    try {
      setIsLoadingBalance(true);
      const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
      const contract = new ethers.Contract(wrappedTokenAddress, WrappedToken.abi, provider);
      const balance = await contract.balanceOf(account);
      setBalance(formatUnits(balance, 6));
    } catch (error) {
      console.error(error);
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

  const deposit = async (account: string, ammount: number) => {
    if (!window.ethereum || !account) {
      return;
    }

    try {
      setIsDepositing(true);
      const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
      const signer = provider.getSigner();

      const allowance = await checkAllowance(account, wrappedTokenAddress);
      if (allowance < ammount) {
        await increaseAllowance(wrappedTokenAddress, ammount);
      }

      const contract = new ethers.Contract(wrappedTokenAddress, WrappedToken.abi, signer);

      contract.connect(signer);
      const depositForTx = await contract.depositFor(account, ammount);
      await depositForTx.wait();

      await refreshEthereumData();
      await refreshFiatData();
      await refreshData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDepositing(false);
    }
  };

  const withdraw = async (account: string, ammount: number) => {
    if (!window.ethereum || !account) {
      return;
    }

    try {
      setIsWithdrawing(true);
      const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(wrappedTokenAddress, WrappedToken.abi, signer);

      contract.connect(signer);
      const withdrawToTx = await contract.withdrawTo(account, ammount);
      await withdrawToTx.wait();

      await refreshEthereumData();
      await refreshFiatData();
      await refreshData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsWithdrawing(false);
    }
  };

  useEffect(() => {
    void refreshData();
  }, [account, chainType]);

  return (
    <WrappedTokenContext.Provider
      value={{
        balance,
        isLoadingBalance,
        deposit,
        isDepositing,
        withdraw,
        isWithdrawing,
      }}
    >
      {children}
    </WrappedTokenContext.Provider>
  );
}
