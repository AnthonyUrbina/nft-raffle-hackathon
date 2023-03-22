import { memo } from 'react'
import { RaffleDetails } from '../../components/pages'
import { useRouter } from 'next/router'



const RaffleDetailsContainer = () => {
    // const router = useRouter()
    // const { raffleId } = router.query

    const dummyRaffleId = '1'

    return (
        < RaffleDetails raffleId={dummyRaffleId} />
    )
}

RaffleDetailsContainer.displayName = 'Create Raffle Container'

export default memo(RaffleDetailsContainer)
