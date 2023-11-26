import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../util/CustomAxios";
import { useInView } from "react-intersection-observer";
import dthumbnail from "../../src/images/default-thumbnail.png";
interface FeedType {
    id: number;
    channelName: string;
    // channelLink: string;
    channelIcon: string;
    channelItemTitle: string;
    channelItemThumbnail: string;
    channelItemDescription: string;
    channelItemLink: string;
    pubDate: string;
}

interface FeedProps {
    type: string;
}

function Feed({ type = "ALL" }: FeedProps): React.ReactElement {
    const size = 6;
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [feeds, setFeeds] = useState<FeedType[]>([]);
    const [ref, inView] = useInView();
    const defaultDescription = "If you're curious, click the link!";

    useEffect(() => {
        const fetchFeeds = (pageNumber: number) => {
            instance
                .get(
                    `/v1/items?size=${size}&page=${pageNumber}&type=${type.toString()}`
                )
                .then((response) => {
                    console.log(response);
                    const newFeeds = response.data.content;
                    setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
                    setPage(pageNumber + 1);
                    console.log(response.data.totalPages);
                    
                    setMaxPage(response.data.totalPages);
                });
        };

        if (inView && (page >= 0 && page <= maxPage)) {
            // 스크롤 시 실행
            fetchFeeds(page);
        }

    }, [inView, page, type]);

    const handleClick = (url: string) => () => {
        window.open(url, "_blank");
    };

    return (
        <S.FeedContainer>
            <S.FeedBackground>
                {feeds.map((feed, index) => (
                    <S.FeedDetail key={index} onClick={handleClick(feed.channelItemLink)}>
                        <S.FeedMain>
                            <S.Image
                                src={
                                    feed.channelItemThumbnail ? feed.channelItemThumbnail : dthumbnail
                                }
                            ></S.Image>
                            <S.Title>{feed.channelItemTitle}</S.Title>
                            <S.Description>
                                {feed.channelItemDescription
                                    ? feed.channelItemDescription
                                    : defaultDescription}
                            </S.Description>
                            <S.HR />
                            <S.Channel>
                                <S.FeedFooterLeft>
                                    <S.ChannelIcon src={feed.channelIcon} />
                                    <S.ChannelName>
                                        {feed.channelName}
                                    </S.ChannelName>
                                </S.FeedFooterLeft>
                                <S.FeedFooterRight>
                                    <S.PubDate>{feed.pubDate}</S.PubDate>
                                    <S.Insert></S.Insert>
                                </S.FeedFooterRight>
                            </S.Channel>
                        </S.FeedMain>
                    </S.FeedDetail>
                ))}
            <div ref={ref}></div>

            </S.FeedBackground>
        </S.FeedContainer>
    );
}

const S = {
    FeedLink: styled.a`
        text-decoration: none;
    `,
    FeedContainer: styled.div`
        // width: 90vw;
        margin-bottom: 50vh;
    `,
    FeedBackground: styled.div`
        width: 90vw;
        display: grid;
        margin: 0 auto;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 5px;

        @media (min-width: 987px) and (max-width: 1335px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 1336px) {
            grid-template-columns: repeat(3, 1fr);
        }
    `,

    FeedFooterLeft: styled.div`
        display: flex;
        align-items: center;
    `,

    FeedFooterRight: styled.div`
        display: flex;
    `,

    HR: styled.hr`
        width: 100%;
        border: none;
        border-bottom: 1px solid #88888855;
        margin: 1vh 0 1vh 0;
    `,
    Insert: styled.p`
        text-decoration: none;
        color: white;
    `,

    FeedDetail: styled.div`
        display: flex;
        justify-content: center;
        // height: 36.5vh;
        user-select: none;
        margin: 2rem auto;

        border: 1px solid #ffffff22;
        background-color: #282c34;
        background: linear-gradient(
            0deg,
            rgba(40, 44, 52, 0.1) 0%,
            rgba(17, 0, 32, 0.5) 100%
        );
        box-shadow: 0 7px 20px 5px #00000088;
        border-radius: 0.7rem;
        -webkit-backdrop-filter: blur(7px);
        overflow: hidden;
        transition: 0.2s all;
        cursor: pointer;
        &:hover {
            border: 1px solid #ffffff44;
            box-shadow: 0 3.5px 25px 5px #000000aa;
            transform: scale(1.015);
        }

        @media (max-width: 400px) {
            width: 80vw;
        }
    `,
    FeedMain: styled.div`
        display: flex;
        flex-direction: column;
        // width: 90%;
        padding: 1rem;
        @media (max-width: 400px) {
            justify-content: center;
        }
    `,

    ChannelName: styled.div`
        text-align: start;
        font-size: 1rem;
        line-height: 100%;
        display: flex;
        color: white;
        font-family: "Elice-Light";
    `,

    Title: styled.h3`
        text-align: start;
        color: white;
        width: 320px;
        // height: 4vh;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.3em;
        height: 2.4em;
        margin: 2vh auto;
        @media (max-width: 400px) {
            font-size: 0.8rem;
            width: 70vw;
        }
    `,
    Description: styled.p`
        text-align: start;
        font-size: max(0.8rem);
        color: #cdcdcd;
        width: 320px;
        font-family: "Elice-Light";

        // margin-bottom: 1vh;
        // display: -webkit-box;
        // -webkit-line-clamp: 1;
        // -webkit-box-orient: vertical;
        // overflow: hidden;
        // text-overflow: ellipsis; /* 생략 부호(...) 사용 */
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        line-height: 1.2em;
        // max-height: 3.6em;
        margin: 2vh auto;
        @media (max-width: 400px) {
            font-size: 0.6rem;
            width: 70vw;
        }
    `,
    PubDate: styled.div`
        text-align: start;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        color: white;
        margin-right: 0.2rem;
    `,

    Channel: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        // margin-top: 0.2rem;
        // margin-bottom: -0.3rem;
    `,
    // ChannelWrapper: styled.div`
    //     text-decoration: none;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     // border: 1px solid #ffffff22;
    //     padding: 0.1rem;
    //     margin: 0;
    //     margin-right: 0.5rem;
    //     border-radius: 100%;
    //     box-shadow: inset 0 0 0 1px #000000aa;
    // `,

    ChannelIcon: styled.img`
        align-items: start;
        // width: 90%
        border-radius: 100%;
        // border: 1px solid #ffffff22;
        width: 20px;
        height: 20px;
        object-fit: cover;
        margin: 0 8px 0 0;
    `,

    FeedInfo: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1vh auto 2vh auto;
    `,

    Image: styled.img`
        border-radius: 0.5rem;
        object-fit: cover;

        width: 320px;
        height: 180px;

        background-size: cover;
        background-position: center;
        margin: 0vh auto;
        @media (max-width: 400px) {
            width: 70vw;
        }
    `,
};

export default Feed;
