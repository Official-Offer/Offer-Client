import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
  const News = dynamic(() => import("@components/main/home").then((mod: any) => mod.News)) as any;
  const Statistical = dynamic(() => import("@components/main/home").then((mod: any) => mod.Statistical)) as any;
  const PriceBoard = dynamic(() => import("@components/main/home").then((mod: any) => mod.PriceBoard)) as any;
  const Banners = dynamic(() => import("@components/main/home").then((mod: any) => mod.Banners)) as any;
  const HighestSocial = dynamic(() => import("@components/main/home").then((mod: any) => mod.HighestSocial)) as any;
  const NFTExplore = dynamic(() => import("@components/main/home").then((mod: any) => mod.NFTExplore)) as any;
  const Blog = dynamic(() => import("@components/main/home").then((mod: any) => mod.Blog)) as any;
  const SocialNetwork = dynamic(() => import("@components/main/home").then((mod: any) => mod.SocialNetwork)) as any;

  return (
    <>
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
