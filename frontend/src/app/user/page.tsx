'use client'

import {Container, Heading, Link, Table, TableRoot} from "@radix-ui/themes";
import Header from "@/app/_components/Header";
import {useRecoilValue} from "recoil";
import {urlState} from "@/state/atoms/url";

type Url = {
    id: number,
    longUrl: string,
    shortUrl: string
}

export default function() {
    const urls = useRecoilValue(urlState);

    return (
        <div>
            <Header />
            <Container size={'3'} p={'4'} mt={'6'}>
                <Heading ml={'2'} mb={'4'}>Your Links,</Heading>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Original URL</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Shorten URL</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>


                    { urls ?
                            <Table.Body>
                                    {urls.map((url: Url) => (
                                        <Table.Row key={url.id}>
                                            <Table.RowHeaderCell>{url.longUrl}</Table.RowHeaderCell>
                                            <Table.Cell><Link href={'http://localhost:3049/'+url.shortUrl}>http://localhost:3049/{url.shortUrl}</Link></Table.Cell>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                     : <div>No data found</div>}
                </Table.Root>
            </Container>
        </div>
    )
}