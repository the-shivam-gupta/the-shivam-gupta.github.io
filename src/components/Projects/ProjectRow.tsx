import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import styles from "./styles.module.scss";

interface ProjectRowProps {
  project: Project;
  priority?: boolean;
}

export function ProjectRow({ project, priority }: ProjectRowProps) {
  return (
    <article className={styles.project} id={`project-${project.index}`}>
      <header className={styles.projectHead}>
        <div className={styles.headLeft}>
          <span className={styles.number} data-parallax data-speed="0.25">
            {project.index}
          </span>
        </div>
        <div className={styles.headMain}>
          <h3 className={styles.title} data-reveal-lines>
            <span className="line-mask">
              <span className="line-mask-inner">{project.title}</span>
            </span>
          </h3>
          <div className={styles.headMeta}>
            <span className={styles.metaItem}>
              <span className={styles.metaKey}>Category</span>
              <span className={styles.metaValue}>{project.category}</span>
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaKey}>Year</span>
              <span className={styles.metaValue}>{project.year}</span>
            </span>
          </div>
        </div>
      </header>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mediaLink}
        data-cursor="VIEW"
        aria-label={`View project ${project.title}`}
      >
        <div className={styles.mediaWrap} style={{ aspectRatio: project.aspect }}>
          <div className={styles.media}>
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              quality={85}
              priority={priority}
              className={styles.img}
            />
          </div>
          <span className={styles.aspectLabel} aria-hidden="true">
            {project.aspect.replace(" / ", ":")}
          </span>
          <span className={styles.viewLabel} aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={1.5} />
            View
          </span>
        </div>
      </a>

      <footer className={styles.foot}>
        <p className={styles.description} data-reveal="fade">
          {project.description}
        </p>
        <ul className={styles.tech} data-reveal="fade" data-delay="0.1">
          {project.tech.map((t) => (
            <li key={t} className={styles.techItem}>
              {t}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}