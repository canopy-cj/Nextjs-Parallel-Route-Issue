import React from 'react';

async function Page(props: { params: Promise<{ all: string[] }> }) {
    const params = await props.params;
    return (
        <div>Breadcrumb: Pokemon &gt; {params.all.join('> ')}</div>
    );
}

export default Page;