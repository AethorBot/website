import Container from '../components/container';

export default function aa() {
	if (typeof window != 'undefined') {
		window.location.href = 'https://discord.gg/zwUQGAG4cP';
	}
	return (
		<Container>
			Please go to https://discord.gg/zwUQGAG4cP for the support server
		</Container>
	);
}
