import Container from '../components/container';

export default function aa() {
	if (typeof window != 'undefined') {
		window.location.href =
			'https://discord.com/oauth2/authorize?client_id=870383692403593226&permissions=117824&scope=bot%20applications.commands';
	}
	return (
		<Container>
			invite aethor at
			https://discord.com/oauth2/authorize?client_id=870383692403593226&permissions=117824&scope=bot%20applications.commands
		</Container>
	);
}
