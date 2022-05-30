import React, { FC } from 'react';
import { BoxALignItemsCenter, BoxBlueBorderRounded } from '@styles/styled-components/styledBox';

export const AppStatistical: FC = () => {
    return (
        <div className="row app-statistical">
            <div className="col-lg-4 col-12 my-lg-0 my-2">
                <BoxBlueBorderRounded className="p-3">
                    <p>90d Users</p>
                    <p className="app-statistical-users">
                        146
                        <span className="ms-3 decrease">-100.00% ↓</span>
                    </p>
                </BoxBlueBorderRounded>
            </div>
            <div className="col-lg-4 col-12 my-lg-0 my-2">
                <BoxBlueBorderRounded className="p-3">
                    <p>90d Volume</p>
                    <p className="app-statistical-volume">
                        $ 20.81K
                        <span className="ms-3 decrease">276310.51% ↓</span>
                    </p>
                </BoxBlueBorderRounded>
            </div>
            <div className="col-lg-4 col-12 my-lg-0 my-2">
                <BoxBlueBorderRounded className="p-3">
                    <p>90d Transactions</p>
                    <p className="app-statistical-transactions">
                        171.00
                        <span className="ms-3 increase">17000.00% ↓</span>
                    </p>
                </BoxBlueBorderRounded>
            </div>
        </div>
    );
};
