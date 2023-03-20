import { memo } from 'react'
import { PublicRaffles } from '../components/pages'

const PublicRafflesContainer = () => {
    return (
        <PublicRaffles pageHeading='Public Raffles'/>
    )
}

PublicRafflesContainer.displayName = 'Create Raffle Container'

export default memo(PublicRafflesContainer)
