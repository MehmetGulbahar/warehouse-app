import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import Sidebar from '@/components/layout/Sidebar'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Warehouse Management System',
  description: 'Modern warehouse management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 min-w-0">
                  <Navbar />
                  <main className="flex-1 p-6 overflow-auto">
                    {children}
                  </main>
                </div>
              </div>
             <Footer />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
