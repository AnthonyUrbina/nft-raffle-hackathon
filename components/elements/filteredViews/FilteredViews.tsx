import {
    Box,
    Flex,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    UnorderedList,
    SimpleGrid,
    Hide,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    Text
} from '@chakra-ui/react'
import { SelectNftCard } from '../selectNftCard';
import { RaffleCard } from '../../elements';
import { RaffleCardProps } from '../raffleCard';
import { useEffect, useMemo, useState } from 'react';

export interface FilteredViewsProps {
    filters: string[]
}

export const FilteredViews = ({filters}: FilteredViewsProps) => {
    const [raffles, setRaffles] = useState<RaffleCardProps[]>([])
    const [selectedFilter, setSelectedFilter] = useState('')


    useEffect(() => {

        const dummyRaffleData = [
            {
                image: '/static/wow.png',
                collection: "World of Women",
                ticketsSold: 0,
                raffleEndTime: 1679458038,
                pricePerTicket: .02,
                totalTickets: 24,
                edition: 'WoW #8604',
                currency: 'ETH',
                altText: "wow"
            },
            {
                image: '/static/supduck.png',
                collection: "SupDucks",
                ticketsSold: 14,
                raffleEndTime: 1679630838,
                pricePerTicket: .03,
                totalTickets: 24,
                edition: 'SupDuck #7292',
                currency: 'ETH',
                altText: "sup-duck"
            }
        ]

        setRaffles(dummyRaffleData)
        setSelectedFilter(filters[0])
    },[filters])

    const handleClick = (filter: string) => {
        // simulate call and response
        console.log(filter)
        setSelectedFilter(filter)
        setRaffles([])
    }

    const tabFactory = () => {
       const tabs = filters.map(filter => {
            return <Tab key={filter} onClick={() => {handleClick(filter)}}>{filter}</Tab>
        })

        return tabs
    }

    const tabPanelFactory = () => {
        const panels = filters.map(filter => {
            return (
                <TabPanel key={`${filter}-panel`}>
                    {
                        raffles && raffles.length && filter === selectedFilter ? raffles.map(raffle => { console.log('ra', raffle); return raffleCardFactory(raffle)})
                            : <Text>Nothing to see here!</Text>

                    }
                </TabPanel>
            )
        })

        return panels
    }

    const raffleCardFactory = (raffle: RaffleCardProps) => {
        const { image, collection, ticketsSold, raffleEndTime, pricePerTicket, totalTickets, edition, currency, altText } = raffle

        return <RaffleCard
                    image={image}
                    collection={collection}
                    ticketsSold={ticketsSold}
                    raffleEndTime={raffleEndTime}
                    pricePerTicket={pricePerTicket}
                    totalTickets={totalTickets}
                    edition={edition}
                    currency={currency}
                    altText={altText}
                />
    }

    return (
        <Tabs variant='soft-rounded' colorScheme='gray'>
            <TabList>
                {tabFactory()}
            </TabList>
            <TabPanels>
                {tabPanelFactory()}
            </TabPanels>
        </Tabs>
    )
}
