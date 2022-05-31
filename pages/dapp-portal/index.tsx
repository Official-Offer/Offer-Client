import { TitleGlobal } from '@components/common/Title';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const DappPortal: NextPage = () => {
  const TabsChain = dynamic(() => import("@components/main/dapp-portal/TabsChain"));
  const TabsCategory = dynamic(() => import("@components/main/dapp-portal/TabsCategory"));
  const TableDapp = dynamic(() => import("@components/main/dapp-portal/TableDapp"));

  return (
    <>
      <section id="main-portal">
        <div className="empty_space_height50" />
        <TitleGlobal>
          <h1 className="mb-0">Dapp Portal</h1>
        </TitleGlobal>
        <br />
        <TabsChain />
        <br />
        <TabsCategory />
        <br />
        <TableDapp />
      </section>
    </>
  )
}

export default DappPortal;
