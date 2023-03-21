import { memo } from 'react'
import { PublicRaffles } from '../components/pages'

const PublicRafflesContainer = () => {
    return (
        <PublicRaffles filters={['Live', 'Expired', 'Created', 'Unclaimed']} pageHeading='My Raffles'/>
    )
}

PublicRafflesContainer.displayName = 'Create Raffle Container'

export default memo(PublicRafflesContainer)
