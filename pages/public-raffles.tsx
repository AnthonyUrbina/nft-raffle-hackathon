import { memo } from 'react'
// import { ErrorBoundary, Meta } from '../components/elements'
import { PublicRaffles } from '../components/pages'
// import {
//     ERROR_FALLBACK,
//     BUBBLE_BOAT_MIAMI_TITLE,
//     BASE_URL,
//     BUBBLE_BOAT_MIAMI,
//     BUBBLE_BOAT_MIAMI_IMAGE,
// } from '../constants'

const PublicRafflesContainer = () => {
    return (
        // <ErrorBoundary fallback={ERROR_FALLBACK}>
        // {/* <Meta
        //         title={CREATE_RAFFLE}
        //         url={`${BASE_URL}${CREATE_RAFFLE}`}
        //         image={CREATE_RAFFLE_IMAGE}
        //     /> */}
        < PublicRaffles />
        // {/* </ErrorBoundary> */ }
    )
}

PublicRafflesContainer.displayName = 'Create Raffle Container'

export default memo(PublicRafflesContainer)
