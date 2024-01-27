'use client'

import {Container, Heading, Link, Table, TableRoot} from "@radix-ui/themes";
import Header from "@/app/_components/Header";
import {useRecoilValue} from "recoil";
import {urlState} from "@/state/atoms/url";
import {userState} from "@/state/atoms/user";

type Url = {
    id: number,
    longUrl: string,
    shortUrl: string
}

function RenderTable(username: string, urls: Url[]) {


    return (
            <Container size={'3'} p={'4'} mt={'6'}>
                <Heading ml={'2'} mb={'4'}>Hello {username}!</Heading>
                <Heading ml={'2'} mb={'4'}>Here are your Links,</Heading>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Original URL</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Shorten URL</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {urls.map((url: Url) => (
                            <Table.Row key={url.id}>
                                <Table.RowHeaderCell>{url.longUrl}</Table.RowHeaderCell>
                                <Table.Cell><Link href={'http://localhost:3049/'+url.shortUrl}>http://localhost:3049/{url.shortUrl}</Link></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Container>
    )
}

export default function() {
    const urls = useRecoilValue(urlState);
    const user = useRecoilValue(userState);

    return (
        <div>
            <Header />
            { urls.length > 0 ? <div>{RenderTable(user.name, urls)}</div> : <div>
                <Heading align={'center'} mt={'8'}>Sorry, no data found</Heading>
            </div>}
        </div>
    )
}