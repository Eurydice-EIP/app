import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

const metrics = [
  { label: "Frontend", value: "Next.js 16" },
  { label: "Backend", value: "NestJS 11" },
  { label: "Data", value: "Prisma + PostgreSQL" },
  { label: "Events", value: "RabbitMQ" },
];

const highlights = [
  {
    title: "A current, opinionated stack",
    text: "The docs now describe the shipped Next.js frontend, the NestJS API, and the infra that connects them.",
  },
  {
    title: "Architecture first",
    text: "Pages focus on modules, routes, data flow, and deployment instead of legacy product ideas.",
  },
  {
    title: "Clean delivery path",
    text: "Setup, testing, and deployment are grouped so the site reads like a working handbook.",
  },
  {
    title: "Brand-aligned presentation",
    text: "The landing page uses the same warm surface, blue accent, and chart-like rhythm as the frontend.",
  },
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.pageShell}>
        <section className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Documentation hub</p>
            <h1 className={styles.heroTitle}>
              Eurydice, documented like a product.
            </h1>
            <p className={styles.heroText}>
              A focused reference for the current frontend, backend, and
              delivery workflow behind Eurydice.
            </p>
            <div className={styles.ctaRow}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
              >
                Read the overview
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/architecture/backend"
              >
                Explore the backend
              </Link>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>Stack map</span>
              <span className={styles.panelStatus}>Current</span>
            </div>

            <div className={styles.pipeline}>
              <div className={styles.pipelineNode}>
                <span>Frontend</span>
                <strong>Next.js App Router</strong>
              </div>
              <div className={styles.pipelineArrow}>/v1</div>
              <div className={styles.pipelineNode}>
                <span>Backend</span>
                <strong>NestJS + Swagger</strong>
              </div>
              <div className={styles.pipelineArrow}>events</div>
              <div className={styles.pipelineNode}>
                <span>Infra</span>
                <strong>Prisma, PostgreSQL, RabbitMQ</strong>
              </div>
            </div>

            <div className={styles.metricGrid}>
              {metrics.map((metric) => (
                <div key={metric.label} className={styles.metricCard}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.highlightsSection}>
          {highlights.map((item) => (
            <article key={item.title} className={styles.highlightCard}>
              <p className={styles.highlightLabel}>Guide</p>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className={styles.stripSection}>
          <div>
            <p className={styles.stripLabel}>What is covered</p>
            <p className={styles.stripText}>
              Frontend architecture, backend modules, local setup, testing,
              deployment, API usage, and git workflow.
            </p>
          </div>
          <Link
            className="button button--outline button--lg"
            to="/docs/development/local-setup"
          >
            Start local setup
          </Link>
        </section>
      </main>
    </Layout>
  );
}
