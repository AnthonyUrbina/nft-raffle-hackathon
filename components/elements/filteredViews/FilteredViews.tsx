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

interface RaffleByFilters  {
    [key: string]: RaffleCardProps[]
}

export const FilteredViews = ({filters}: FilteredViewsProps) => {
    const [raffles, setRaffles] = useState<RaffleByFilters>({})
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

        setRaffles({live: dummyRaffleData})
        setSelectedFilter(filters[0])
    },[filters])

    const handleClick = (filter: string) => {
        // simulate call and response
        // must return an object
        // ex const raffles = { live: [obj1, obj2], expired: {obj1, obj2}}
        console.log(filter)
        setSelectedFilter(filter)
    }

    const tabFactory = () => {
       const tabs = filters.map(filter => {
            return <Tab key={filter} onClick={() => {handleClick(filter)}}>{filter}</Tab>
        })

        return tabs
    }

    const tabPanelFactory = () => {
        const panels = filters.map(filter => {
            const _filter = filter.toLocaleLowerCase()
            const _selectedFilter = selectedFilter.toLocaleLowerCase()
            return (
                <TabPanel key={`${filter}-panel`} display='flex' flexWrap={['wrap']} justifyContent={['center', 'flex-start']}>
                    {
                        raffles[`${_filter}`] && raffles[`${_filter}`].length && _filter === _selectedFilter ? raffles[`${_filter}`].map(raffle => { console.log('ra', raffle); return raffleCardFactory(raffle)})
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
