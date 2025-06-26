export interface Course {
    id: string
    image: string
    title: string
}

export const courses: Course[] = [
    { id: 'c1', image: 'https://via.placeholder.com/300x200?text=React', title: 'Introduction à React' },
    { id: 'c2', image: 'https://via.placeholder.com/300x200?text=TypeScript', title: 'Maîtriser TypeScript' },
    { id: 'c3', image: 'https://via.placeholder.com/300x200?text=Next.js', title: 'Deep Dive Next.js' },
    { id: 'c4', image: 'https://via.placeholder.com/300x200?text=Tailwind', title: 'Design avec Tailwind CSS' },
    { id: 'c5', image: 'https://via.placeholder.com/300x200?text=API', title: 'Construire une API REST' },
]

export interface Mentor {
    id: string
    avatar: string
    firstName: string
    specialty: string
    rating: number
    learners: number
}

export const mentors: Mentor[] = [
    { id: 'm1', avatar: 'https://via.placeholder.com/100?text=Alice', firstName: 'Alice', specialty: 'React', rating: 4.8, learners: 120 },
    { id: 'm2', avatar: 'https://via.placeholder.com/100?text=Bob', firstName: 'Bob', specialty: 'TypeScript', rating: 4.5, learners: 95 },
    { id: 'm3', avatar: 'https://via.placeholder.com/100?text=Claire', firstName: 'Claire', specialty: 'Next.js', rating: 4.7, learners: 110 },
    { id: 'm4', avatar: 'https://via.placeholder.com/100?text=David', firstName: 'David', specialty: 'Tailwind CSS', rating: 4.6, learners: 85 },
]

export interface Testimonial {
    id: string
    avatar: string
    name: string
    comment: string
}

export const testimonials: Testimonial[] = [
    { id: 't1', avatar: 'https://via.placeholder.com/80?text=User1', name: 'Emma', comment: "Une expérience incroyable, j'ai beaucoup appris !" },
    { id: 't2', avatar: 'https://via.placeholder.com/80?text=User2', name: 'Lucas', comment: "Les mentors sont très pédagogues et disponibles." },
    { id: 't3', avatar: 'https://via.placeholder.com/80?text=User3', name: 'Chloé', comment: 'J’ai trouvé le plateau de cours très complet.' },
    { id: 't4', avatar: 'https://via.placeholder.com/80?text=User4', name: 'Maxime', comment: 'Le slider de commentaires est super fluide !' },
    { id: 't5', avatar: 'https://via.placeholder.com/80?text=User5', name: 'Sophie', comment: 'Je recommande vivement cette plateforme.' },
]