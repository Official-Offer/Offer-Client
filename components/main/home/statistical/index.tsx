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
                populate: '*',
                pagination: {
                    page: 1,
                    pageSize: 3,
                },
                sort: ['dailyUser:desc']
            }, {
                encodeValuesOnly: true,
            });
            const volumeQuery = qs.stringify({
                populate: '*',
                pagination: {
                    page: 1,
                    pageSize: 3,
                },
                sort: ['dailyVolume:desc']
            }, {
                encodeValuesOnly: true,
            });
            const socialSignalQuery = qs.stringify({
                populate: '*',
                pagination: {
                    page: 1,
                    pageSize: 3,
                },
                sort: ['socialSignal:desc']
            }, {
                encodeValuesOnly: true,
            });
            let newArr = [...statisticalList];
            await request.get(`/dapps?${userQuery}`).then((res) => {
                //console.log(res)
                let newObj = { ...newArr[0] };
                newObj.dapp = res.data.data;
                newArr[0] = newObj;
            });
            await request.get(`/dapps?${volumeQuery}`).then((res) => {
                //console.log(res)
                let newObj = { ...newArr[1] };
                newObj.dapp = res.data.data;
                newArr[1] = newObj;
            });
            await request.get(`/dapps?${socialSignalQuery}`).then((res) => {
                //console.log(res)
                let newObj = { ...newArr[2] };
                newObj.dapp = res.data.data;
                newArr[2] = newObj;
            });
            await setStatisticalList(newArr);
            // console.log(newArr)
        })();
    }, []);

    return (
        <section className="main-homepage-statistical">
            <div className="row">
                {statisticalList && statisticalList.map((statistical, i) => {
                    return (
                        <div className="col-lg-4 col-12 my-lg-0 my-4 px-lg-5 px-2" key={i}>
                            <UserStats data={statistical} />
                        </div>
                    )
                })}
            </div>
        </section>
    );
};
