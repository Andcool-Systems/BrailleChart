import { Roboto_Mono } from 'next/font/google';
import '@/app/globals.css';
const roboto = Roboto_Mono({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={roboto.className}>
            <body>{children}</body>
        </html>
    )
}
