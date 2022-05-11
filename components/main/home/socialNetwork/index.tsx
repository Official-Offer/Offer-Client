import React, { FC } from 'react';
import { ButtonBlue } from '@styles/styled-components/styledButton';
import { message } from 'antd';
import axios from 'axios';
import { URL_API_ADMIN } from '@config/index';
import Link from 'next/link';

export const SocialNetwork: FC = () => {

    const appList = [
        { logo: '/img/icons/social-discord.png', description: 'Lorem Ipsum is simply dummy text of the', href: 'https://discord.gg/jD4PK8dECp', button: 'Join Discord' },
        { logo: '/img/icons/social-twitter.png', description: 'Lorem Ipsum is simply dummy text of the', href: 'https://twitter.com/tokenplay2', button: 'Follow Twitter' },
        { logo: '/img/icons/social-telegram.png', description: 'Lorem Ipsum is simply dummy text of the', href: 'https://t.me/tokenplaycommunityofficial', button: 'Join Telegram' },
    ];

    const onSubmitMessage = async (e: any) => {
        e.preventDefault();
        if (e.target[0].value && e.target[1].value) {
            const data = {
                data: {
                    username: e.target[0].value,
                    email: e.target[1].value,
                    description: e.target[2].value,
                },
            };
            await axios.post(`${URL_API_ADMIN}/api/contacts`, data).then((res) => {
                if (res.status == 200) {
                    message.success('Send message success');
                    e.target.reset();
                } else {
                    message.success('Something was errors! Please try again');
                }
            });
        }
    }

    return (
        <section className="main-homepage-socialnetwork px-lg-3 px-0">
            <h2>Join With Us</h2>
            <div className="row align-items-center">
                <div className="col-lg-6 col-12">
                    <div className="row">
                        {appList.map((app, i) => {
                            return (
                                <div className="col-lg-6 col-12 my-4" key={i}>
                                    <div className="main-homepage-socialnetwork-app">
                                        <img className="main-homepage-socialnetwork-app-logo" src={app.logo} alt="" />
                                        <p className="main-homepage-socialnetwork-app-description">
                                            {app.description}
                                        </p>
                                        <Link
                                            href={app.href}
                                            passHref={app.href === '' ? false : true}
                                        >
                                            <a
                                                className="main-homepage-socialnetwork-app-btn btn-blue px-3 py-2"
                                                target={app.href === '#' ? '_self' : '_blank'}
                                            >
                                                {app.button}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <h4>Leave A Message</h4>
                    <form
                        className="main-homepage-socialnetwork-app-form-submit"
                        onSubmit={onSubmitMessage}
                    >
                        <input type="text" placeholder="Your name" name="name" required />
                        <input type="email" placeholder="Your email" name="email" required />
                        <textarea rows={15} placeholder='Message' name="message" />
                        <ButtonBlue className="px-4 py-2" type="submit">
                            Send Message
                        </ButtonBlue>
                    </form>
                </div>
            </div>
        </section>
    );
};
