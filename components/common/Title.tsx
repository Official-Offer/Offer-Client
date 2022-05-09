import React, { ReactElement } from 'react';
import { BoxALignCenter_Justify_ItemsCenter } from '@styles/styled-components/styledBox';

export function TitleGlobal(props: any): ReactElement {
    return (
        <BoxALignCenter_Justify_ItemsCenter>
            <img className="mw-100 block-for-pc" src="/img/vector/title_vector_left.png" alt="" />
            {props.children}
            <img className="mw-100 block-for-pc" src="/img/vector/title_vector_right.png" alt="" />
        </BoxALignCenter_Justify_ItemsCenter>
    );
};