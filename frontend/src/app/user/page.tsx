"use client";

import { Container, Heading, Link, Table, Text } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Header from "@/app/_components/Header";
import { useRecoilState, useRecoilValue } from "recoil";
import { urlState } from "@/state/atoms/url";
import { userState } from "@/state/atoms/user";
import { urlLoading } from "@/state/selectors/isUrlLoading";
import { Spinner } from "@/app/_components/Spinner";
import { deleteShortUrl, getUserUrls } from "../actions";
import { userLoading } from "@/state/selectors/isUserLoading";

type Url = {
    id: number;
    longUrl: string;
    shortUrl: string;
};


export default function() {
    const [urls, setUrls] = useRecoilState(urlState);
    const user = useRecoilValue(userState);
    const isUrlLoading = useRecoilValue(urlLoading);
    const isUserLoading = useRecoilValue(userLoading);

    async function handleDelete(id: number) {
        const res = await deleteShortUrl(id);
        if (res.status === 'success') {
            getUserUrls(user.id).then(function(result) {
                setUrls({ urls: result, isLoading: false })
            })
        }
    }

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
                            <Table.Row key={url.id} className="group/link">
                                <Table.RowHeaderCell>{url.longUrl}</Table.RowHeaderCell>
                                <Table.Cell>
                                    <div className="flex items-center justify-between">
                                        <Link href={"http://localhost:3049/" + url.shortUrl} target="_blank">
                                            http://localhost:3049/{url.shortUrl}
                                        </Link>
                                        <TrashIcon onClick={() => handleDelete(url.id)} className="w-4 h-4 cursor-pointer hover:text-zinc-500 active:text-zinc-700 invisible group-hover/link:visible" />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Container>
        );
    }

    if (!user.email && !isUserLoading) return <div className="w-screen h-screen grid place-items-center text-2xl">
        <div>Unauthorized! You must <Link href="/auth/login">Login</Link> first!</div>
    </div>

    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <Header />
            <div className="w-full h-full max-w-[1024px]">
                {urls.urls.length > 0 ? (
                    <div>{RenderTable(user.name, urls.urls)}</div>
                ) : (
                    isUrlLoading ? <Spinner /> : <div><Heading align={"center"} mt={"8"}>Sorry, no data found</Heading></div>
                )}
            </div>
        </div>
    );
}
