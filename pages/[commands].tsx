import type { NextPage } from 'next';
import Commands from '../data/commands.json';
import Container from '../components/container';
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
} from '@chakra-ui/react';
import Link from 'next/link';

// type Categories = keyOf Commands;

const Home: NextPage<{ commands: Command[]; categories: string[] }> = ({
	commands,
	categories,
}) => {
	return (
		<Container>
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
		</Container>
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
		paths: [...Object.keys(Commands), '/', 'commands'].map((x) => ({
			params: { commands: x },
		})),
		fallback: false,
	};
}

export default Home;
