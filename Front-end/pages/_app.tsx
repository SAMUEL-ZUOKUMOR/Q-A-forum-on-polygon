import '@fontsource/poppins';
import theme from '../theme';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster, toast } from 'react-hot-toast';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { WagmiConfig, createClient } from 'wagmi';
import { providers } from 'ethers';

// Use wagmi to configure the provider.
// Right now, we will only connect to hardhat's standalone localhost network
const alchemyNodeProvider = new providers.JsonRpcProvider(
  'https://polygon-mumbai.g.alchemy.com/v2/NtpDBRQdao8qpOZrcd_3CFRVIEbhsyQv', 
  {name: 'maticmum', chainId: 80001, ensAddress: undefined}
);
// Give wagmi our provider config and allow it to autoconnect wallet
const client = createClient({
  autoConnect: true,
  provider: alchemyNodeProvider,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        'Network Error: Ensure Metamask is connected & on the same network that your contract is deployed to.'
      );
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
  // Provide the WagmiConfig at the top-level of our app
    <WagmiConfig client={client}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Component {...pageProps} />
          <Toaster position='bottom-right' />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;