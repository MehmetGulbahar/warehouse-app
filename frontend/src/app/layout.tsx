import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AuthProvider } from '@/providers/AuthProvider'
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
          <AuthProvider>
            <div className="flex overflow-hidden h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1 min-w-0">
                <Navbar />
                <main className="overflow-auto flex-1 p-6">
                  {children}
                </main>
              </div>
            </div>
           <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
