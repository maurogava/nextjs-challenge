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
              <Logo className={styles.logo} viewBox="0 0 160 39" />
            </a>
          </Link>
        </div>
      </header>

      <div className={cn(styles.content, styles.container)}>{children}</div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <Logo className={styles.footerLogo} viewBox="0 0 160 39" />
          <p className={styles.footerText}>
            ©2021 MAKESPACE, LLC. NEW YORK, NY
          </p>
          <p className={styles.footerText}>
            MakeSpace® is a registered trademark of MakeSpace, LLC.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Layout
