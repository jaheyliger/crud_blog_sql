import type { NextPage } from 'next';
import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Textarea, Text, Grid, Button } from '@nextui-org/react';
import Link from 'next/link';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const CreateArticle: NextPage = () => {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();
	const [articleData, setArticleData] = useState({ title: '', content: '' });

	const handleChange = (e: any) => {
		setArticleData({ ...articleData, [e.target.name]: e.target.value });
	};
	const createArticle = async () => {
		try {
			const { data, error } = await supabaseClient
				.from('articles')
				.insert([
					{
						title: articleData.title,
						content: articleData.content,
						user_email: user?.email?.toLowerCase(),
						user_id: user?.id
					}
				])
				.single();
			if (error) throw error;
			setArticleData({ title: '', content: '' });
			router.push('/mainFeed');
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<Grid.Container gap={1}>
			<Text h3>Title</Text>
			<Grid xs={12}>
				<Textarea
					name='title'
					aria-label='title'
					placeholder='What is the title of your post?'
					fullWidth={true}
					rows={1}
					size='xl'
					onChange={handleChange}
				/>
			</Grid>
			<Text h3>Article Text</Text>
			<Grid xs={12}>
				<Textarea
					name='content'
					aria-label='content'
					placeholder='Enter the content here'
					fullWidth={true}
					rows={6}
					size='xl'
					onChange={handleChange}
				/>
			</Grid>
			<Grid xs={12}>
				<Text>Posting as {user?.email}</Text>
			</Grid>
			<Button onPress={createArticle}>Create Article</Button>
		</Grid.Container>
	);
};

export default CreateArticle;

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });
