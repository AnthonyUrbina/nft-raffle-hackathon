import { memo } from 'react'
import { RaffleDetails } from '../../components/pages'
import { useRouter } from 'next/router'
import { getServerSideProps } from '../create-raffle'



const RaffleDetailsContainer = () => {
    const router = useRouter()
    let { id } = router.query
    id = id!.toString()

    return (
        < RaffleDetails raffleId={id} />
    )
}

RaffleDetailsContainer.displayName = 'Create Raffle Container'

export default memo(RaffleDetailsContainer)
