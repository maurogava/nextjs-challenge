import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Logo from '/assets/logo-white.svg'

import styles from './Layout.module.scss'

const Layout: FC = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" prefetch={false}>
            <a>
              <Logo />
            </a>
          </Link>
        </div>
      </header>
      <div className={cn(styles.content, styles.container)}>{children}</div>
      <footer>
        <div className={styles.container}>footer</div>
      </footer>
    </>
  )
}

export default Layout
