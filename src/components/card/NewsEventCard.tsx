import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Card as AntdCard, Button, Modal } from "antd";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
interface NewsEventCardProps {
  newsEvent?: NewsEvent;
  loading?: boolean;
}
type NewsEvent = {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  date: Date;
  location?: string;
};

export const NewsEventCard: React.FC<NewsEventCardProps> = ({ newsEvent, loading, ...rest }) => {
  const { Meta } = AntdCard;

  return (
    <>
      <AntdCard
        className="newsEvent-card"
        loading={loading}
        children={
          newsEvent && (
            <div>
              <Meta
                description={
                  <>
                    <img className="newsEvent-image" src={newsEvent.image} />
                    <div className="newsEvent-content">
                      <h4 className="clamp-1 bold">{newsEvent.title}</h4>
                      <div className="newEvent-content-detail">
                        <div className="location-tag">
                          <MapPinIcon className="uni-icon" />
                          {newsEvent.location}
                        </div>
                        <div className="date-tag">
                          <CalendarDaysIcon className="uni-icon" />
                          {newsEvent.date.toLocaleDateString("en-GB")}
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          )
        }
      ></AntdCard>
    </>
  );
};
 