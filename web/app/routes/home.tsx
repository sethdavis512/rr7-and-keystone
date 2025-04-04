import type { Route } from './+types/home';
import { client } from '~/utils/graphql.server';
import {
    GetKitchenSinkDocument,
    type GetKitchenSinkQuery
} from '~/generated/graphql';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' }
    ];
}

export async function loader() {
    const { posts, customers, users } =
        await client.request<GetKitchenSinkQuery>(GetKitchenSinkDocument);

    return {
        customers,
        posts,
        users
    };
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
