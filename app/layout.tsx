import './styles/global.css'

import Header from './components/header'
import Footer from './components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Benoit Bruynbroeck | Fullstack developer',
  description: 'Freelance Web Developer',
}
