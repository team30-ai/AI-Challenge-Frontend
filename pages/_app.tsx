import "@/styles/globals.css";
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { HospitalProvider } from "@/components/context/HospitalContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HospitalProvider>
          <Component {...pageProps} />
        </HospitalProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
