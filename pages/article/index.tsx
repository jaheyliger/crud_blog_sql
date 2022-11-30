import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Spacer, User, Text, Button } from '@nextui-org/react';

const Article: NextPage = () => {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();
	const [article, setArticle] = useState<any>({});
	const { id } = router.query;

	useEffect(() => {
		const getArticle = async () => {
			const { data, error } = await supabaseClient
				.from('articles')
				.select('*')
				.filter('id', 'eq', id)
				.single();
			if (error) {
				console.error(error);
			} else {
				setArticle(data);
			}
		};

		if (typeof id !== 'undefined') {
			getArticle();
		}
	}, [id]);

	const deleteArticle = async () => {
		try {
			const { data, error } = await supabaseClient
				.from('articles')
				.delete()
				.eq('id', id);
			if (error) throw new error();
			router.push('/mainFeed');
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<>
			<Text h2>{article.title}</Text>
			<Spacer y={0.5} />
			<User name={article.user_email?.toLowerCase()} size='md' />
			<Spacer y={1} />
			<Text size='$lg'>{article.content}</Text>
			{user && article.user_id === user.id ? (
				<>
					<Spacer y={0.5} />
					<Button
						size='sm'
						onPress={() => router.push('/editArticle?id=' + id)}
					>
						Edit
					</Button>
					<Spacer y={0.5} />
					<Button size='sm' color='error' onPress={() => deleteArticle()}>
						Delete
					</Button>
				</>
			) : null}
		</>
	);
};

export default Article;
