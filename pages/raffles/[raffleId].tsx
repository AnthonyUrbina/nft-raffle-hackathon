import { memo } from 'react'
import { RaffleDetails } from '../../components/pages'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import type { DocumentData } from '@firebase/firestore-types';
import { AlmostThere } from '../../components/pages';

export interface RaffleDetailsContainerProps {
    raffle: Raffle
}

const RaffleDetailsContainer = ({raffle}: RaffleDetailsContainerProps) => {
    const router = useRouter()
    let { raffleId } = router.query
    raffleId = raffleId!.toString()

    return (
        < RaffleDetails raffle={raffle} />
    )
}

export interface Raffle {
    raffleId: number;
    nftTokenId: number;
    nftCollectionAddress: string;
    edition: string;
    image: string;
    altText: string;
    raffleEndDate: number
    winner: string
    erc20Address: string
    owner: string
    entries: string[]
    prizeClaimed: boolean
    raffleEnded: boolean
    reservePrice: number
    isAbortable: false
    collectionName: string
    ticketPrice: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let { raffleId } = context.query
    const querySnapshot = await getDocs(collection(db, "raffles"));
    const documents: Raffle[] = querySnapshot.docs.map((doc) => doc.data() as Raffle);
    const raffle = documents.filter(raffle => { console.log('server filter raffle', raffle); return raffle.raffleId === Number(raffleId) })
    return {
        props: { raffle: raffle[0] ?? {} }
    }
}

RaffleDetailsContainer.displayName = 'Create Raffle Container'

export default memo(RaffleDetailsContainer)
