import type { StaticImageData } from 'next/image'

import citizenplane from '@/public/works/citizenplane.webp'
import businessDecision from '@/public/works/business-decision.webp'
import openclassrooms from '@/public/works/openclassrooms.webp'

export interface Work {
  id: string
  title: string
  role: string
  image: StaticImageData
  imageAlt: string
  description: string
  achievements: string
  stack: string
}

export const WORKS: readonly Work[] = [
  {
    id: 'citizenplane',
    title: 'CitizenPlane',
    role: 'Tech lead',
    image: citizenplane,
    imageAlt:
      'CitizenPlane project - Tech Lead role showcasing scalable web application development',
    description:
      'As a Tech Lead at CitizenPlane, I led the development of a scalable travel management platform. I architected a microservices architecture using Docker and Kubernetes, resulting in 40% improved system performance and 60% faster deployment cycles. I mentored a team of 4+ developers, implemented CI/CD pipelines, and established code review processes that reduced production bugs. The platform handles complex travel workflows with real-time data processing and integrates with multiple third-party APIs.',
    achievements: 'Led team of 4+ developers',
    stack:
      'VueJs, Node.js, TypeScript, PostgreSQL, Docker, Kubernetes, AWS (ECS, RDS, S3), RabbitMQ, Datadog',
  },
  {
    id: 'business-decision',
    title: 'Business & Decision',
    role: 'Consultant for Accor Hotels',
    image: businessDecision,
    imageAlt:
      'Business & Decision project - CRM Consultant role for Accor Hotels and other enterprise clients',
    description:
      'At Business & Decision, I worked as a CRM Consultant managing high-profile accounts including Accor Hotels and Norauto. I designed and implemented data management solutions that processed millions of customer records, resulting in 30% improved customer engagement rates. I led the migration of legacy systems to modern CRM platforms, reducing data processing time by 45%. My role involved creating ETL pipelines, optimizing database performance, and training client teams on new systems. I successfully delivered projects worth over €200K while maintaining 99.9% system uptime.',
    achievements:
      '30% improved engagement • 45% faster processing • €200K+ projects delivered • 99.9% uptime',
    stack:
      'Adobe Campaign, Talend, Oracle SQL, PL/SQL, Data Modeling, ETL Processes',
  },
  {
    id: 'openclassrooms',
    title: 'Openclassrooms',
    role: 'Mentor for Web Development',
    image: openclassrooms,
    imageAlt:
      'OpenClassrooms project - Web Development Mentor role helping students learn React and modern JavaScript',
    description:
      'At OpenClassrooms, I mentor 50+ students in web development programs, with a 95% success rate in helping them complete their courses and land their first developer jobs. I provide personalized guidance on React, JavaScript, and modern web development practices. My mentoring approach includes code reviews, project feedback, and career guidance. I’ve helped students build portfolio projects that showcase real-world applications, with several mentees securing positions at tech companies including startups and established firms. I also contribute to curriculum development and best practices documentation.',
    achievements:
      '95% student success rate • 50+ students mentored • Career placement support • Curriculum contributions',
    stack:
      'React, JavaScript (ES6+), HTML5, CSS3, Git, Node.js, Modern Development Tools',
  },
]
