import { memo } from 'react'
import { AllRaffles } from '../components/pages'

const PublicRafflesContainer = () => {
    return (
        <AllRaffles filters={['Live', 'Expired', 'Created', 'Unclaimed']} pageHeading='My Raffles'/>
    )
}

PublicRafflesContainer.displayName = 'Create Raffle Container'

export default memo(PublicRafflesContainer)
