import React from 'react';

async function Page(props: { params: Promise<{ pokemon: string }> }) {
    console.log('Pokemon Page')

    const params = await props.params

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
        .then(res => res.json() as Promise<{
            abilities: {
                ability: {
                    name: string,
                    url: string,
                },
                slot: number
            }[],
            id: number,
            name: string,
            sprites: {
                back_default: string;
            }
        }>)

    return (
        <div>
            <img src={res.sprites.back_default} alt={res.name} width={200} height={200}/>
            <div>
                ID: {res.id}
            </div>
            <div>
                Name: {res.name}
            </div>
            <div>
                Abilities:
                <ol className="list-disc">
                    {res.abilities.map(ability =>
                        (<li key={ability.ability.name} className="ml-8">
                            {ability.ability.name}
                        </li>))}
                </ol>
            </div>
        </div>
    );
}

export default Page;