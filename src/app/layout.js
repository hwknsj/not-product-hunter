import { Inter } from 'next/font/google'
import cx from 'classnames'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Product Finder',
  description: 'Find amazing products! (Not associated with Product Hunter!!!)'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={cx(inter.className, 'container', 'grid')}>
        {children}
      </body>
    </html>
  )
}
