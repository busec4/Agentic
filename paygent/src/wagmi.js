import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { http, WagmiProvider } from 'wagmi';
import {
  mainnet,
  sepolia,
  arbitrumSepolia,
  baseSepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'PAygent-front',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, sepolia, arbitrumSepolia, baseSepolia],
    ssr: true, 
    transports: {
        [mainnet.id]:http('https://eth-mainnet.g.alchemy.com/v2/..'),
        [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/..'),
        [arbitrumSepolia.id]: http('https://arb-sepolia.g.alchemy.com/v2/..'),
        [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/..')
    }
});

export default config;
