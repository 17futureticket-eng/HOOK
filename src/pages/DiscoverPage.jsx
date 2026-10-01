import Hero from '../components/Hero'
import Stats from '../components/Stats'
import HookBlocks from '../components/HookBlocks'
import Integrations from '../components/Integrations'
import CommunityTicker from '../components/CommunityTicker'
import CommunityLove from '../components/CommunityLove'
import PoolsTable from '../components/PoolsTable'
import RoleCards from '../components/RoleCards'
import WhatYouCanDo from '../components/WhatYouCanDo'
import MoreHooks from '../components/MoreHooks'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function DiscoverPage({ onScanAddress }) {
  return (
    <>
      <Hero onScanAddress={onScanAddress} />
      <Stats />
      <HookBlocks />
      <Integrations />
      <CommunityTicker />
      <CommunityLove />
      <PoolsTable />
      <RoleCards />
      <WhatYouCanDo />
      <MoreHooks />
      <FAQ />
      <Footer />
    </>
  )
}
