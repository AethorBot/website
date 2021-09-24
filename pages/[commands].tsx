import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Commands from '../data/commands.json';
// import Container from '../components/container';
import {
	Flex,
	Button,
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionButton,
	Box,
	AccordionIcon,
	Tag,
	Text,
	Code,
	SimpleGrid,
	GridItem,
	Spacer,
	HStack,
	IconButton,
	useColorMode,
	useDisclosure,
	Stack,
	Container,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';

// type Categories = keyOf Commands;
const Links = [
	{
		name: 'Home',
		route: '/general',
	},
];
const Home: NextPage<{ commands: Command[]; categories: string[] }> = ({
	commands,
	categories,
}) => {
	const navigationItem = (
		<>
			{Links.map((link) => (
				<Link href={link.route} key={link.name}>
					{link.name}
				</Link>
			))}
		</>
	);
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
	return (
		<Box>
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
			<Flex alignItems="stretch" maxW="70rem" margin="auto">
				<Box className="flex-initial" minH="100vh" height="100%">
					<SimpleGrid columns={1} height="auto">
						{categories.map((x, y) => {
							if (x == '') return <></>;
							return (
								<GridItem key={y}>
									<Link href={`/${x}`} passHref>
										<Button>{x}</Button>
									</Link>
								</GridItem>
							);
						})}
					</SimpleGrid>
					<Spacer />
				</Box>
				<Box maxW="50rem" width="100%">
					<Accordion allowToggle width="100%">
						{commands.map((x, y) => {
							return (
								<AccordionItem key={y}>
									<h2>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												{Array.isArray(x.n) ? x.n.join(' ') : x.n}
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										<Box>
											{x.a?.map((k, y) => {
												return (
													<Tag key={y} color="teal.50">
														{Array.isArray(x.n) ? `${x.n[0]} ${k}` : k}
													</Tag>
												);
											})}
										</Box>
										<Box>
											<Text>Syntax</Text>
											<Code>{x.s}</Code>
										</Box>
										<Box>
											<Text>{x.d}</Text>
										</Box>
									</AccordionPanel>
								</AccordionItem>
							);
						})}
					</Accordion>
				</Box>
			</Flex>
		</Box>
	);
};

interface Command {
	//NAME
	n: string | string[];
	//DESCRIPTION
	d: string;
	//SYNTAX
	s: string;
	//ALIASES
	a: string[];
}

export async function getStaticProps(context: any) {
	let commands: Command[] =
		//@ts-ignore -
		Commands[context.params.commands] || Commands.general;
	return {
		props: { commands, categories: Object.keys(Commands) },
	};
}

export async function getStaticPaths() {
	return {
		paths: [...Object.keys(Commands), '/', 'commands', '404'].map((x) => ({
			params: { commands: x },
		})),
		fallback: false,
	};
}

export default Home;
