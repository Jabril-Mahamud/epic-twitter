import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            name: true,
            ranking: true,
        },
        orderBy: [
            { ranking: 'asc' },
            { username: 'asc' },
        ],
    })

    return json({ users })
}

export default function GamesRoute() {
    const { users } = useLoaderData<typeof loader>()

    return (
        <div className="container mb-48 mt-36 flex flex-col items-center justify-center gap-6">
            <h1 className="text-h1">Epic Notes Users Ranking</h1>
            <main className="w-full max-w-[800px]">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-muted">
                            <th className="border p-2 text-left">Rank</th>
                            <th className="border p-2 text-left">Username</th>
                            <th className="border p-2 text-left">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="even:bg-muted">
                                <td className="border p-2">
                                    {user.ranking ?? 'Unranked'}
                                </td>
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.name ?? '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}