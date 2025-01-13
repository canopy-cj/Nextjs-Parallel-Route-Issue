import Link from "next/link";

export default async function Home(props: { searchParams: Promise<{ offset?: number }> }) {
    console.log('Pokemon List Page')

    const searchParams = await props.searchParams;
    const offset = Number(searchParams.offset);

    let url = 'https://pokeapi.co/api/v2/pokemon'
    const limit = 20;
    if (offset) {
        url += `?offset=${offset}&limit=${limit}`;
    }

    const res = await fetch(url)
        .then(res => res.json() as Promise<{
            count: number,
            previous: string | null;
            next: string | null;
            results: {
                name: string;
                url: string;
            }[]
        }>);

    const pokemons = res.results;

    return (
        <div>
            <div>
                <div>List of pokemons:</div>
                <ol className="list-disc">
                    {pokemons.map(pokemon => (
                        <li key={pokemon.name} className="ml-8">
                            <Link className="text-blue-500 hover:underline"
                                  href={`${pokemon.name}`}>{pokemon.name}</Link>
                        </li>
                    ))}
                </ol>

            </div>

            <div className="flex items-center gap-2">
                {
                    res.previous && offset ?
                        <Link href={`?offset=${offset - limit}`} className="border rounded">
                            Previous Page
                        </Link>
                        : null
                }
                {
                    res.next ?
                        <Link href={`?offset=${offset ? offset + 20 : 20}`} className="border rounded">
                            Next Page
                        </Link>
                        : null
                }
            </div>

        </div>
    );
}
