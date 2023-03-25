import { memo } from 'react'
import { Notifications } from '../components/pages'

const PublicRafflesContainer = () => {
  return (
    <Notifications/>
  )
}

PublicRafflesContainer.displayName = 'Create Raffle Container'

export default memo(PublicRafflesContainer)
