import Container from '../components/container';

export default function aa() {
	if (typeof window != 'undefined') {
		window.location.href = '/general';
	}
	return <Container>Please go to /general for the commands</Container>;
}
