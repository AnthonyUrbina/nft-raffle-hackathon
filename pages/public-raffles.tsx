import { memo } from 'react'
import { PublicRaffles } from '../components/pages'
<PublicRaffles filters={['Live', 'Expired']} pageHeading='Public Raffles' />

const PublicRafflesContainer = () => {
    return (
        <PublicRaffles filters={['Live', 'Expired']} pageHeading='Public Raffles'/>
    )
}

PublicRafflesContainer.displayName = 'Create Raffle Container'

export default memo(PublicRafflesContainer)
