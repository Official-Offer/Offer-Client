import React, { FC, useEffect, useState } from 'react';
import UserStats from './Stats';
import request from '@services/apiService';
import * as qs from 'qs';

export const Statistical: FC = () => {
    const [statisticalList, setStatisticalList] = useState([
        {
            title: 'User(24h)', img: '/img/icons/fired.png', dapp: [],
        },
        {
            title: 'Volume', img: '/img/icons/volume_up.png', dapp: [],
        },
        {
            title: 'Social Signal', img: '/img/icons/circle_question.png', dapp: [],
        }
    ]);

    useEffect(() => {
        (async () => {
            const userQuery = qs.stringify({
                populate: `%2A`,
                pagination: {
                    page: 1,
                    pageSize: 3,
                },
                sort: [`dailyUserDiff%3Adesc`]
            }, {
                encodeValuesOnly: true,
                encode:false,
            });
            const volumeQuery = qs.stringify({
                populate: '%2A',
                pagination: {
                    page: 1,
                    pageSize: 3,
                },
                sort: ['dailyVolumeDiff%3Adesc']
            }, {
                encodeValuesOnly: true,
                encode: false,
            });
            const socialSignalQuery = qs.stringify({
                populate: '%2A',
                pagination: {
                    page: 1,
                    pageSize: 3,
                },
                sort: ['socialSignalDiff%3Adesc']
            }, {
                encodeValuesOnly: true,
                encode: false,
            });
            let newArr = [...statisticalList];
            await request.get(`/dapps?${userQuery}`).then((res) => {
                let newObj = { ...newArr[0] };
                newObj.dapp = res.data.data;
                newArr[0] = newObj;
            });
            await request.get(`/dapps?${volumeQuery}`).then((res) => {
                let newObj = { ...newArr[1] };
                newObj.dapp = res.data.data;
                newArr[1] = newObj;
            });
            await request.get(`/dapps?${socialSignalQuery}`).then((res) => {
                let newObj = { ...newArr[2] };
                newObj.dapp = res.data.data;
                newArr[2] = newObj;
            });
            await setStatisticalList(newArr);
        })();
    }, []);

    return (
        <section className="main-homepage-statistical">
            <div className="d-flex justify-content-center flex-wrap">
                {statisticalList && statisticalList.map((statistical, i) => {
                    return (
                        <div className="main-homepage-statistical-box px-lg-4 px-md-2 px-2" key={i}>
                            <UserStats data={statistical} />
                        </div>
                    )
                })}
            </div>
        </section>
    );
};
