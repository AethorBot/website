import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { object, oneOfType, func, node } from 'prop-types';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function AethorAPp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
AethorAPp.propTypes = {
	Component: oneOfType([node, func]),
	pageProps: object,
};
export default AethorAPp;
