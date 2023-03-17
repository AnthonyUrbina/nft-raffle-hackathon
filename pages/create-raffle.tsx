import { memo } from 'react'
import { CreateRaffle } from '../components/pages'
import { Alchemy, Network } from "alchemy-sdk";


interface nftData {
    title: string,
    tokenId: string,
    image: string
}

export interface CreateRaffleContainerProps {
    nfts: nftData[]
}

const CreateRaffleContainer = ({nfts}: CreateRaffleContainerProps) => {
    return (
        <CreateRaffle nfts={nfts} />
    )
}

export async function getServerSideProps(){
    const ALCHEMY_GOERELI_API_KEY = 'NqZC2xpmcgq_3E7l6QInk5oda1UXVQB4'

    const config = {
        apiKey: process.env.ALCHEMY_GOERELI_API_KEY,
        network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(config);

    const address = "0x07c233C36ac7103bDDD8fdebE9935fE871BF5474";

    const nftsRes = await alchemy.nft.getNftsForOwner(address);
    const nfts: nftData[] = nftsRes.ownedNfts.map(nft => {
        const { title, tokenId, media } = nft
        const image = media[0].gateway
        const nftData = {
            title,
            tokenId,
            image
        }
        return nftData;
    })

    return {
        props: { nfts }
    }
}


CreateRaffleContainer.displayName = 'Create Raffle Container'

export default memo(CreateRaffleContainer)
