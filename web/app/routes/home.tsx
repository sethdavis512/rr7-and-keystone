import type { Route } from './+types/home';
import { client } from '~/utils/graphql.server';
import {
    GetKitchenSinkDocument,
    type GetKitchenSinkQuery
} from '~/generated/graphql';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'CMS | RR7 & Keystone' },
        { name: 'description', content: 'React Router 7 & Keyston CMS stack' }
    ];
}

export async function loader() {
    try {
        const { posts, customers, users } =
            await client.request<GetKitchenSinkQuery>(GetKitchenSinkDocument);

        return {
            customers,
            posts,
            users
        };
    } catch (error) {
        console.error('Error in loader:', error);

        return { status: 'ERROR' };
    }
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <pre>
                <code>{JSON.stringify(loaderData, null, 4)}</code>
            </pre>
        </>
    );
}
