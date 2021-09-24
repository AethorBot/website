import Head from 'next/head';
import {
	Box,
	HStack,
	Text,
	IconButton,
	Flex,
	Button,
	useColorMode,
	useDisclosure,
	Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

import Link from 'next/link';
const Links = [
	{
		name: 'Home',
		route: '/',
	},
];
export default function Container({ children }: any) {
	const meta = {
		title: 'Aethor',
		description: `AEthor is the best discord bot for all your needs`,
		type: 'website',
		themeColor: '#317EFB',
		keywords: 'discord bot discordbot aethor tricked.pro',
		viewport:
			'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
	};
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	const navigationItem = (
		<>
			{Links.map((link) => (
				<Link href={link.route} key={link.name}>
					{link.name}
				</Link>
			))}
		</>
	);

	return (
		<>
			<Head>
				<title>{meta.title}</title>

				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content={meta.viewport} />
				<meta name="keywords" content={meta.keywords} />
				<meta name="theme-color" content={meta.themeColor} />

				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />

				<meta property="og:url" content={`https://aethor.tricked.pro}`} />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content={meta.title} />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@tricked" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
			</Head>
			<Box py={5} borderTop="2px" borderTopColor="green.500">
				<Container maxW="container.lg">
					<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
						<IconButton
							size={'md'}
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							aria-label={'Open Menu'}
							display={{ md: !isOpen ? 'none' : 'inherit' }}
							onClick={isOpen ? onClose : onOpen}
						/>
						<HStack spacing={8} alignItems={'center'}>
							<HStack
								as={'nav'}
								spacing={4}
								display={{ base: 'none', md: 'flex' }}
							>
								<Text>
									<b>Aethor</b>
								</Text>

								{navigationItem}
							</HStack>
						</HStack>
						<Flex alignItems={'center'}>
							<Button aria-label="Switch Theme" onClick={toggleColorMode}>
								{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							</Button>
						</Flex>
					</Flex>

					{isOpen ? (
						<Box pb={4} mt={3}>
							<Stack as={'nav'} spacing={4}>
								{navigationItem}
							</Stack>
						</Box>
					) : null}
				</Container>
			</Box>

			{children}
		</>
	);
}
