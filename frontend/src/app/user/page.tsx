"use client";

import {Container, Heading, Link, Table, Text} from "@radix-ui/themes";
import Header from "@/app/_components/Header";
import { useRecoilValue } from "recoil";
import { urlState } from "@/state/atoms/url";
import { userState } from "@/state/atoms/user";
import {urlLoading} from "@/state/selectors/isUrlLoading";
import {Spinner} from "@/app/_components/Spinner";

type Url = {
    id: number;
    longUrl: string;
    shortUrl: string;
};

function RenderTable(username: string, urls: Url[]) {
    return (
        <Container mt={"6"} mx={"6"}>
            <Heading mb={"4"}>Hello {username}!</Heading>
            <Heading mb={"4"}>Here are your Links,</Heading>
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
                            <Table.Cell>
                                <Link href={"http://localhost:3049/" + url.shortUrl} target="_blank">
                                    http://localhost:3049/{url.shortUrl}
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Container>
    );
}

export default function () {
    const urls = useRecoilValue(urlState);
    const user = useRecoilValue(userState);
    const isUrlLoading = useRecoilValue(urlLoading);

    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <Header />
            <div className="w-full h-full max-w-[1024px]">
                {urls.urls.length > 0 ? (
                    <div>{RenderTable(user.name, urls.urls)}</div>
                ) : (
                    isUrlLoading ? <Spinner/> : <div><Heading align={"center"} mt={"8"}>Sorry, no data found</Heading></div>
                )}
            </div>
        </div>
    );
}
