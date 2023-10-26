import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import instance from "../util/CustomAxios";
import { useInView } from "react-intersection-observer";
import dthumbnail from '../../src/images/default-thumbnail.png';
interface Feed {
    id: number;
    channelName: string;
    channelLink: string;
    channelIcon: string;
    title: string;
    thumbnail: string;
    description: string;
    link: string;
    pubDate: string;
}

interface FeedProps {
    type: string;
}

function Feed({type = 'ALL'}: FeedProps):React.ReactElement {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);
    const [ref, inView] = useInView();
    const defaultDescription = '궁금하시다면 링크를 클릭해보세요!';

    const fetchFeeds = () => {
        instance
        .get(`/api/feeds?size=${size}&page=${page}&type=${type.toString()}`)
        .then(async (response) => {
            const feeds = response.data.content;
            setFeeds((prevfeeds) => [...prevfeeds, ...feeds]);
            setPage(page + 1)
        });
    }

    useEffect(() => {
        // inView가 true 일때만 실행한다.
        if (inView) {
          // 실행할 함수
          fetchFeeds();
        }
        
      }, [inView]);

    useEffect(() => {
        instance
            .get(`/api/feeds?size=${size}&page=${page}&type=${type}`)
            .then(async (response) => {
                const feeds = response.data.content;
                setFeeds(feeds);
            });
    }, []);

    const handleClick = (url: string) => () => {

        window.open(url, '_blank')
    }



    return (
        <S.FeedContainer>
            <S.FeedBackground>
                {feeds.map((feed) => (
                    <S.FeedDetail key={feed.id} onClick={handleClick(feed.link)}>
                        <S.FeedMain>
                            <S.Image src={feed.thumbnail ? feed.thumbnail : dthumbnail}></S.Image>
                            <S.Title>{feed.title}</S.Title>
                            <S.Description>{feed.description ? feed.description : defaultDescription}</S.Description>
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
            </S.FeedBackground>
            <div ref={ref}></div>

        </S.FeedContainer>
    );
}

const S = {

    FeedLink: styled.a`
        text-decoration: none;
    `,
    FeedContainer: styled.div`
        width: 100vw;
    `,
    FeedBackground: styled.div`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;
        width: 80vw;
        margin: 0 auto;
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
    `,
    FeedMain: styled.div`
        display: flex;
        flex-direction: column;
        // width: 90%;
        padding: 1rem;
    `,

    ChannelName: styled.div`
        text-align: start;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
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
    `,
    Description: styled.p`
        text-align: start;
        font-size: max(0.8rem);
        color: #CDCDCD;
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
        width: 1.4rem;
        height: 1.4rem;
        object-fit: cover;
        margin: 0 0.5vw 0 0;
    `,

    FeedInfo: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1vh 0 2vh 0;
    `,

    Image: styled.img`
        border-radius: 0.5rem;
        object-fit: cover;

        width: 320px;
        height: 180px;

        background-size: cover;
        background-position: center;
    `,
};

export default Feed;
