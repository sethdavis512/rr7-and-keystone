import type { Route } from './+types/home';
import { client } from '~/utils/graphql.server';
import {
    GetKitchenSinkDocument,
    type GetKitchenSinkQuery
} from '~/generated/graphql';
import { FlatCache } from 'flat-cache';

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

const cache = new FlatCache();

let isInitialRequest = true;

export async function clientLoader({
    request,
    serverLoader
}: Route.ClientLoaderArgs) {
    const cacheKey = request.url;

    if (isInitialRequest) {
        isInitialRequest = false;

        const serverData = await serverLoader();

        cache.setKey(cacheKey, serverData);
        cache.save();

        return serverData;
    }

    const cachedData = cache.getKey(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const serverData = await serverLoader();

    cache.setKey(cacheKey, serverData);
    cache.save();

    return serverData;
}

clientLoader.hydrate = true;

// export async function clientAction({
//     request,
//     serverAction
// }: Route.ClientActionArgs) {
//     const cacheKey = request.url;
//     cache.removeKey(cacheKey);
//     cache.save();
//     const serverData = await serverAction();
//     return serverData;
// }

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <pre>
                <code>{JSON.stringify(loaderData, null, 4)}</code>
            </pre>
        </>
    );
}
