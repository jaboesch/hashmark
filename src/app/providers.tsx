"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  APP_NAME,
  WALLETCONNECT_PROJECT_ID,
} from "@/utils/applicationConstants";
import { Provider } from "jotai";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: APP_NAME,
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [base],
  ssr: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider>{children}</Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
