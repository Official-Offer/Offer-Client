import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
<<<<<<< HEAD
  const DappNews = dynamic(() => import("@components/main/home").then((mod: any) => mod.DappNews));
=======
>>>>>>> origin/dev
  const News = dynamic(() => import("@components/main/home").then((mod: any) => mod.News));
  const Statistical = dynamic(() => import("@components/main/home").then((mod: any) => mod.Statistical));
  const PriceBoard = dynamic(() => import("@components/main/home").then((mod: any) => mod.PriceBoard));
  const Banners = dynamic(() => import("@components/main/home").then((mod: any) => mod.Banners));
  const HighestSocial = dynamic(() => import("@components/main/home").then((mod: any) => mod.HighestSocial));
  const NFTExplore = dynamic(() => import("@components/main/home").then((mod: any) => mod.NFTExplore));
  const Blog = dynamic(() => import("@components/main/home").then((mod: any) => mod.Blog));
  const SocialNetwork = dynamic(() => import("@components/main/home").then((mod: any) => mod.SocialNetwork));

  return (
    <>
<<<<<<< HEAD
      <DappNews />
=======
>>>>>>> origin/dev
      <News />
      <Statistical />
      <PriceBoard />
      <Banners />
      <HighestSocial />
      <NFTExplore />
      <Blog />
      <SocialNetwork />
    </>
  )
}

export default Home
