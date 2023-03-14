

export interface CreateRaffleFormProps {
    title: string
    description: string
    image: string
    altText: string
    date: string
    route: string
    past: boolean
}

export const CreateRaffleForm = ({
    title,
    description,
    image,
    altText,
    date,
    route,
    past
}: CreateRaffleFormProps) => { }