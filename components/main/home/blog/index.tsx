import React, { FC, useEffect, useState } from 'react';
import { ButtonGradientBlue } from '@styles/styled-components/styledButton';
import BlogSlides from '../slides/BlogSlides';
import request from '@services/apiService';
import * as qs from 'qs';

export const Blog: FC = () => {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        (async () => {
            const query = qs.stringify({
                populate: '*',
                pagination: {
                    page: 1,
                    pageSize: 6,
                },
                sort: [`createdAt:desc`]
            }, {
                encodeValuesOnly: true,
            });
            await request.get(`/posts?${query}`).then((res) => {
                setBlogList(res.data.data);
            })
        })();
    }, []);

    return (
        <section className="main-homepage-blog px-3">
            <div className="row align-items-center">
                <div className="col-lg-3 col-12 px-lg-2 px-0">
                    <h2>Blog</h2>
                    <p>
                        Here you will find the history and technology behind Bitcoin and other popular altcoins. Learn how Cryptos are shaping Web 3.0.
                    </p>
                    <ButtonGradientBlue className="px-4">
                        View All
                    </ButtonGradientBlue>
                </div>
                <div className="col-lg-9 col-12 mt-lg-0 mt-4 px-lg-2 px-0">
                    <BlogSlides data={blogList} />
                </div>
            </div>
            <div className="main-homepage-blog-background" />
        </section>
    );
};
