import { css } from "@linaria/core";
import { useThemeStore } from "@/stores/theme-store";
import { motion } from "framer-motion";
import { useState } from "react";

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface ProjectData {
  name: string;
  description: React.ReactNode;
  link: string;
  techStack: string[];
}

interface ProjectCardProps {
  project: ProjectData;
  isExpanded: boolean;
  isDimmed: boolean;
  onClick: () => void;
}

export default function ProjectCard({ project, isExpanded, isDimmed, onClick }: ProjectCardProps) {
  const { theme } = useThemeStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      animate={{
        scale: isExpanded ? 1.12 : 1,
        opacity: isDimmed ? 0.35 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut", layout: { duration: 0.35, ease: "easeInOut" } }}
      style={{
        background: theme.background,
        borderColor: isHovered ? "#4a4d4c" : "#303030",
        borderWidth: 2,
        zIndex: isExpanded ? 10 : 1,
      }}
    >
      <div className={styles.header}>
        <h3 className={styles.name} style={{ color: theme.text }}>
          {project.name}
        </h3>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
          onClick={(e) => e.stopPropagation()}
          style={{ color: theme.text }}
        >
          ↗
        </a>
      </div>

      <p className={styles.description} style={{ color: theme.text, '--accent-color': theme.accent } as React.CSSProperties}>
        {project.description}
      </p>

      <motion.div className={styles.techStackContainer} layout>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={styles.capsule}
            style={{
              color: theme.text,
              backgroundColor: hexToRgba(theme.text, 0.08),
              borderColor: hexToRgba(theme.text, 0.2),
            }}
          >
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.div
        layout
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ display: "flex", justifyContent: "flex-end", overflow: "hidden" }}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewLink}
          onClick={(e) => e.stopPropagation()}
          style={{ color: theme.accent }}
        >
          View on GitHub →
        </a>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    width: 400px;
    min-width: 400px;
    height: auto;
    min-height: 380px;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    border: solid;
    box-sizing: border-box;
    transition: background 0.4s ease, border-color 0.2s, border-width 0.2s;
    position: relative;
    overflow: hidden;
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  `,
  name: css`
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 22px;
    margin: 0;
    line-height: 1.2;
    transition: color 0.4s ease;
  `,
  externalLink: css`
    font-size: 20px;
    text-decoration: none;
    opacity: 0.6;
    padding: 4px;
    line-height: 1;
    transition: opacity 0.2s, color 0.4s ease;
    &:hover {
      opacity: 1;
    }
  `,
  description: css`
    font-family: Inter, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.85;
    margin: 0 0 16px 0;
    flex-grow: 1;
    transition: color 0.4s ease;
    font-weight: 400;
    & strong {
      font-weight: 700;
      color: var(--accent-color);
    }
  `,
  techStackContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  `,
  capsule: css`
    display: inline-flex;
    align-tems: center;
    padding: 4px 12px;
    border-radius: 12px;
    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 500;
    border: 1px solid;
    transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
  `,
  viewLink: css`
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    margin-top: auto;
    align-self: flex-end;
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    border-radius: 12px;
    border: 2px solid;
    transition: color 0.4s ease, border-color 0.4s ease, opacity 0.15s;
    &:hover {
      opacity: 0.8;
    }
  `,
};