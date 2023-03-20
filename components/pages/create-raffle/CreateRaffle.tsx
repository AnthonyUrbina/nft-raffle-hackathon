import {
    Heading
} from '@chakra-ui/react'
import { CreateRaffleForm } from '../../elements'
import { CreateRaffleContainerProps } from '../../../pages/create-raffle'

export interface CreateRaffleProps extends Omit<CreateRaffleContainerProps, 'handleConnectWallet'> {
}

export const CreateRaffle = ({ nfts }: CreateRaffleProps) => {
    return (
        <>
        <Heading fontFamily='Inter' as='h3' fontWeight='semibold' p='.5rem'>
            Create Raffle
        </Heading>
        <CreateRaffleForm nfts={nfts}/>
        </>
    )
}
