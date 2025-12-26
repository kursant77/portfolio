import { ContactInfo, Project, Service } from '../types/database';

export interface PersonSchema {
    '@context': string;
    '@type': string;
    name: string;
    jobTitle: string;
    description?: string;
    url: string;
    email?: string;
    telephone?: string;
    image?: string;
    sameAs?: string[];
    knowsAbout?: string[];
    address?: {
        '@type': string;
        addressCountry: string;
    };
}

export interface ContactPointSchema {
    '@context': string;
    '@type': string;
    contactType: string;
    telephone?: string;
    email?: string;
    availableLanguage: string[];
}

export interface CreativeWorkSchema {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    url: string;
    image?: string;
    author: {
        '@type': string;
        name: string;
    };
    dateCreated?: string;
}

export interface ServiceSchema {
    '@context': string;
    '@type': string;
    serviceType: string;
    provider: {
        '@type': string;
        name: string;
    };
    description?: string;
}

export interface ItemListSchema {
    '@context': string;
    '@type': string;
    itemListElement: Array<{
        '@type': string;
        position: number;
        item: CreativeWorkSchema | { '@type': string; name: string; item: string };
    }>;
}

export interface BreadcrumbListSchema {
    '@context': string;
    '@type': string;
    itemListElement: Array<{
        '@type': string;
        position: number;
        name: string;
        item: string;
    }>;
}

export interface SiteNavigationElementSchema {
    '@context': string;
    '@type': string;
    hasPart: Array<{
        '@type': string;
        name: string;
        url: string;
    }>;
}

export function generatePersonSchema(
    contactInfo?: ContactInfo | null,
    currentLanguage: string = 'uz'
): PersonSchema {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-project.vercel.app';

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Asadbek Jumanazarov',
        jobTitle: 'Full Stack Developer',
        description: 'Professional Full Stack Developer specializing in React, TypeScript, Node.js, and modern web technologies. Experienced in building scalable web applications and e-commerce platforms.',
        url: baseUrl,
        email: contactInfo?.email || 'kursant410@gmail.com',
        telephone: contactInfo?.phone || '+998900033723',
        image: `${baseUrl}/me.png`,
        sameAs: [
            contactInfo?.github_url || 'https://github.com/kursant77',
            contactInfo?.linkedin_url || 'https://linkedin.com/in/asadbek',
            contactInfo?.telegram_url || 'https://t.me/kursant77'
        ].filter(Boolean),
        knowsAbout: [
            'React',
            'TypeScript',
            'JavaScript',
            'Node.js',
            'Full Stack Development',
            'Web Development',
            'Frontend Development',
            'Backend Development',
            'Supabase',
            'PostgreSQL',
            'Tailwind CSS',
            'API Development',
            'E-commerce Development'
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'UZ'
        }
    };
}

export function generateContactPointSchema(
    contactInfo?: ContactInfo | null
): ContactPointSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: contactInfo?.phone || '+998900033723',
        email: contactInfo?.email || 'kursant410@gmail.com',
        availableLanguage: ['Uzbek', 'English', 'Russian']
    };
}

export function generateProjectSchema(
    project: Project,
    currentLanguage: string = 'uz'
): CreativeWorkSchema {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-project.vercel.app';

    const titleKey = `title_${currentLanguage}` as keyof Project;
    const descKey = `description_${currentLanguage}` as keyof Project;

    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: (project[titleKey] as string) || project.title_uz || '',
        description: (project[descKey] as string) || project.description_uz || '',
        url: project.demo_url,
        image: project.image,
        author: {
            '@type': 'Person',
            name: 'Asadbek Jumanazarov'
        },
        dateCreated: project.created_at
    };
}

export function generateServiceSchema(
    service: Service,
    currentLanguage: string = 'uz'
): ServiceSchema {
    const titleKey = `title_${currentLanguage}` as keyof Service;

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: (service[titleKey] as string) || service.title_uz || '',
        provider: {
            '@type': 'Person',
            name: 'Asadbek Jumanazarov'
        }
    };
}

export function generateItemListSchema(
    projects: Project[],
    currentLanguage: string = 'uz'
): ItemListSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: generateProjectSchema(project, currentLanguage)
        }))
    };
}

export function generateBreadcrumbSchema(baseUrl: string): BreadcrumbListSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Projects',
                item: `${baseUrl}#projects`
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Skills',
                item: `${baseUrl}#skills`
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: 'Services',
                item: `${baseUrl}#services`
            },
            {
                '@type': 'ListItem',
                position: 5,
                name: 'Contact',
                item: `${baseUrl}#contact`
            }
        ]
    };
}

export function generateNavigationSchema(baseUrl: string): SiteNavigationElementSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        hasPart: [
            { '@type': 'WebPage', name: 'Home', url: baseUrl },
            { '@type': 'WebPage', name: 'Skills', url: `${baseUrl}#skills` },
            { '@type': 'WebPage', name: 'Projects', url: `${baseUrl}#projects` },
            { '@type': 'WebPage', name: 'Services', url: `${baseUrl}#services` },
            { '@type': 'WebPage', name: 'CV', url: `${baseUrl}#cv` },
            { '@type': 'WebPage', name: 'Contact', url: `${baseUrl}#contact` }
        ]
    };
}

// Combine all schemas for the main page
export function generateAllStructuredData(
    contactInfo?: ContactInfo | null,
    projects?: Project[],
    services?: Service[],
    currentLanguage: string = 'uz'
): Array<PersonSchema | ContactPointSchema | ItemListSchema | BreadcrumbListSchema | SiteNavigationElementSchema> {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-project.vercel.app';

    const schemas: Array<PersonSchema | ContactPointSchema | ItemListSchema | BreadcrumbListSchema | SiteNavigationElementSchema> = [
        generatePersonSchema(contactInfo, currentLanguage),
        generateContactPointSchema(contactInfo),
        generateBreadcrumbSchema(baseUrl),
        generateNavigationSchema(baseUrl)
    ];

    if (projects && projects.length > 0) {
        schemas.push(generateItemListSchema(projects, currentLanguage));
    }

    return schemas;
}
