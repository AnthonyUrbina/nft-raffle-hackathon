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
import { FirebaseRaffle } from '../../pages';
import { FilteredRaffles } from '../../pages';

export interface FilteredViewsProps {
    filteredRaffles: FilteredRaffles
    filters: string[]
}

// should be able to remove filters and just loop through the properties of filteredRaffles to get them

export const FilteredViews = ({filteredRaffles, filters}: FilteredViewsProps) => {

    const tabFactory = () => {
       const tabs = filters.map(filter => {
            return <Tab key={filter}>{filter}</Tab>
        })

        return tabs
    }

    const tabPanelFactory = () => {
        const panels = filters.map(filter => {
            const _filter = filter.toLocaleLowerCase()
            // const _selectedFilter = selectedFilter.toLocaleLowerCase()
            return (
                <TabPanel key={`${filter}-panel`} display='flex' flexWrap={['wrap']} justifyContent={['center', 'flex-start']}>
                    {
                        filteredRaffles[_filter] && filteredRaffles[_filter].length ? filteredRaffles[_filter].map(raffle => {
                            console.log(filteredRaffles[_filter])
                            console.log('rafff', raffle)
                            return raffleCardFactory(raffle)
                        })
                            : <Text>Nothing to see here!</Text>
                    }
                </TabPanel>
            )
        })

        return panels
    }

    const raffleCardFactory = (raffle: RaffleCardProps) => {
        const { image, collection, raffleId, ticketsSold, raffleEndTime, pricePerTicket, reservePrice, edition, currency, altText } = raffle

        return <RaffleCard
                    image={image}
                    collection={collection}
                    ticketsSold={ticketsSold}
                    raffleEndTime={raffleEndTime}
                    pricePerTicket={pricePerTicket}
                    reservePrice={reservePrice}
                    edition={edition}
                    currency={currency}
                    altText={altText}
                    raffleId={raffleId}
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
