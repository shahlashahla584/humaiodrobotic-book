import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroOverlay} />

      <div className="container">
        <div className={styles.heroContent}>
          {/* Center Text */}
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              Physical AI & Humanoid Robotics
            </Heading>

            <p className={styles.heroSubtitle}>
              Explore the future of embodied intelligence, humanoid robots, and
              AI-driven physical systems. Hands-on simulations, VLAs, ethics, and
              advanced robotics included.
            </p>

            <Link className={styles.ctaButton} to="/docs/book/course-overview">
              Start Learning 🚀
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Learn about humanoid robotics, simulation, Visual Language Models, ethics, and hands-on AI development."
    >
      <HomepageHeader />
      <main className={styles.mainContent}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
