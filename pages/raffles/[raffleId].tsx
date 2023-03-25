import { memo } from 'react'
import { RaffleDetails } from '../../components/pages'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import type { DocumentData } from '@firebase/firestore-types';



const RaffleDetailsContainer = () => {
    const router = useRouter()
    let { raffleId } = router.query
    console.log('raffleId', router.query)
    raffleId = raffleId!.toString()

    return (
        < RaffleDetails />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let { raffleId } = context.query
    console.log('raffleId', raffleId)
    const querySnapshot = await getDocs(collection(db, "raffles"));
    const documents = querySnapshot.docs.map(doc => doc.data());
    console.log('documents', documents)
    const raffle = documents.filter(raffle => { console.log('raffle', raffle); return raffle.raffleId === Number(raffleId) })
    console.log('raffle', raffle)
    return {
        props: { raffle: raffle[0] ?? {} }
    }
}

RaffleDetailsContainer.displayName = 'Create Raffle Container'

export default memo(RaffleDetailsContainer)
