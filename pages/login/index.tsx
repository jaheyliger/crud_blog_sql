import type { NextPage } from 'next';
import React from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Navbar, Button, Text } from '@nextui-org/react';
import Link from 'next/link';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

const Login: NextPage = () => {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	if (user) {
		router.push('/mainFeed');
	}

	return (
		<Auth
			appearance={{ theme: ThemeSupa }}
			supabaseClient={supabaseClient}
		/>
	);
};

export default Login;
