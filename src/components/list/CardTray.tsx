import React, { useRef } from "react";

import { Card as AntdCard, Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

type TrayProps = {
  cardList: unknown[],
  cardsDisplayNum?: number,
  isLoading?: boolean,
};

export const CardTray: React.FC<TrayProps> = ({cardList, cardsDisplayNum, isLoading}) => {
  const cardTrayRef = useRef(null);
  const { Meta } = AntdCard;

  const scrollLeft = (e) => {
    e.preventDefault();
    cardTrayRef.current.scrollBy({
      left: -cardTrayRef.current.clientWidth,
      behavior: "smooth"
    });
  };
  const scrollRight = (e) => {
    e.preventDefault();
    cardTrayRef.current.scrollBy({
      left: cardTrayRef.current.clientWidth,
      behavior: "smooth"
    });
  };

  return (
    <div className="card-tray-container">
      <Button className="scroll-btn prev-btn" icon={<ArrowLeftOutlined />} onClick={scrollLeft}/>
      <div className="card-tray-main" ref={cardTrayRef} hidden={isLoading}>
        {cardList}
      </div>
      <Button className="scroll-btn next-btn" icon={<ArrowRightOutlined />} onClick={scrollRight}/>
    </div>
  );
};
