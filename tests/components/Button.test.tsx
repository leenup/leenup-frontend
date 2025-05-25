import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../components/ui/Button'

describe('Button', () => {
    it('affiche le texte passé en children', () => {
        render(<Button>Valider</Button>)
        expect(screen.getByText('Valider')).toBeInTheDocument()
    })

    it('déclenche la fonction onClick', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Clique ici</Button>)
        fireEvent.click(screen.getByText('Clique ici'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})