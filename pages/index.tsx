import { Component } from 'react';
export default function aa() {
	if (typeof window != 'undefined') {
		window.location.href = '/general';
	}
	return <div>Please go to /general for the commands</div>;
}
