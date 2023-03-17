import { memo } from 'react'
import { PublicRaffles } from '../components/pages'

const PublicRafflesContainer = () => {
    return (
        < PublicRaffles />
    )
}

PublicRafflesContainer.displayName = 'Create Raffle Container'

export default memo(PublicRafflesContainer)
