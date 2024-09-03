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
import { TooltipProvider } from "@radix-ui/react-tooltip";

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
          <TooltipProvider>
            <Provider>{children}</Provider>
          </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
