import { ExternalProvider } from '@ethersproject/providers';
import { ChainType } from 'src/types/ChainType';

declare global {
  interface ProviderMessage {
    type: string;
    data: unknown;
  }

  interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
  }

  interface ConnectInfo {
    chainId: string;
  }

  interface DefinedExternalProvider extends Omit<ExternalProvider, 'request'> {
    request(params: { method: 'eth_requestAccounts' }): Promise<string[]>;
    request(params: { method: 'eth_chainId' }): Promise<string>;
    request(params: { method: 'wallet_switchEthereumChain'; params: [{ chainId: ChainType }] }): Promise<void>;
    on(method: 'connect', handler: (connectInfo: ConnectInfo) => void): void;
    on(method: 'disconnect', handler: (error: ProviderRpcError) => void): void;
    on(method: 'accountsChanged', handler: (accounts: string[]) => void): void;
    on(method: 'chainChanged', handler: (chainId: string) => void): void;
    on(method: 'message', handler: (message: ProviderMessage) => void): void;
  }

  interface Window {
    ethereum?: DefinedExternalProvider;
  }
}
