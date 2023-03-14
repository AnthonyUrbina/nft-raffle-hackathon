

export interface RaffleCardProps {
    title: string
    description: string
    image: string
    altText: string
    date: string
    route: string
    past: boolean
}

export const RaffleCard = ({
    title,
    description,
    image,
    altText,
    date,
    route,
    past
}: RaffleCardProps) => { }