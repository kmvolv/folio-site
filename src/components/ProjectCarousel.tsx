import { css } from "@linaria/core";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import ProjectCard, { ProjectData } from "./ProjectCard";

interface ProjectCarouselProps {
	projects: ProjectData[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);
	const mouseXRef = useRef(0.5);
	const isHoveringRef = useRef(false);
	const expandedIdRef = useRef<string | null>(null);
	const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

	// Keep ref in sync with state for rAF loop
	expandedIdRef.current = expandedId;

	const tripledProjects = useMemo(
		() =>
			[0, 1, 2].flatMap((setIndex) =>
				projects.map((project, i) => ({
					...project,
					_id: `${setIndex}-${i}-${project.name}`,
				}))
			),
		[projects]
	);

	const handleScroll = useCallback(() => {
		const container = containerRef.current;
		if (!container || expandedIdRef.current !== null || projects.length === 0)
			return;

		const setWidth = container.scrollWidth / 3;
		const sl = container.scrollLeft;

		if (sl < setWidth) {
			container.scrollLeft = sl + setWidth;
		} else if (sl >= 2 * setWidth) {
			container.scrollLeft = sl - setWidth;
		}
	}, [projects.length]);

	const handleCardClick = useCallback(
		(id: string, cardElement: HTMLElement) => {
			setExpandedId(id);
			cardElement.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "nearest",
			});
		},
		[]
	);

	const closeExpanded = useCallback(() => {
		setExpandedId(null);
	}, []);

	// Initialize scroll position to the middle set
	useEffect(() => {
		const container = containerRef.current;
		if (!container || projects.length === 0) return;

		const setWidth = container.scrollWidth / 3;
		container.scrollLeft = setWidth;
	}, [projects.length]);

	// rAF loop for hover-based scrolling
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const maxSpeed = 25;
		const deadZone = 0.15;

		const animate = () => {
			if (expandedIdRef.current === null) {
				if (isHoveringRef.current) {
					const relativeX = mouseXRef.current;
					const distanceFromCenter = relativeX - 0.5;
					const absDistance = Math.abs(distanceFromCenter);

					if (absDistance > deadZone) {
						const direction = distanceFromCenter > 0 ? 1 : -1;
						const magnitude = (absDistance - deadZone) / (0.5 - deadZone);
						const speed = magnitude * maxSpeed;
						container.scrollLeft += direction * speed;
					}
				} else {
					// Auto-scroll slowly to the right when not hovering
					container.scrollLeft += 0.8;
				}
			}
			rafRef.current = requestAnimationFrame(animate);
		};

		rafRef.current = requestAnimationFrame(animate);

		return () => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, []);

	// Mouse tracking
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = container.getBoundingClientRect();
			mouseXRef.current = (e.clientX - rect.left) / rect.width;
			isHoveringRef.current = true;
		};

		const handleMouseLeave = () => {
			isHoveringRef.current = false;
		};

		container.addEventListener("mousemove", handleMouseMove);
		container.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			container.removeEventListener("mousemove", handleMouseMove);
			container.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	// Click outside, right-click, and Escape handlers
	useEffect(() => {
		if (expandedId === null) return;

		const handleClick = (e: MouseEvent) => {
			const expandedCard = cardRefs.current.get(expandedId);
			if (expandedCard && expandedCard.contains(e.target as Node)) {
				return;
			}
			setExpandedId(null);
		};

		const handleContextMenu = (e: MouseEvent) => {
			e.preventDefault();
			setExpandedId(null);
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setExpandedId(null);
			}
		};

		const timeout = setTimeout(() => {
			document.addEventListener("click", handleClick);
		}, 100);

		document.addEventListener("contextmenu", handleContextMenu);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			clearTimeout(timeout);
			document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [expandedId]);

	return (
		<div className={styles.wrapper}>
			<div
				ref={containerRef}
				className={styles.container}
				onScroll={handleScroll}
			>
				{tripledProjects.map((project) => (
					<div
						key={project._id}
						ref={(el) => {
							if (el) {
								cardRefs.current.set(project._id, el);
							}
						}}
						className={styles.cardWrapper}
					>
						<ProjectCard
							project={project}
							isExpanded={expandedId === project._id}
							isDimmed={expandedId !== null && expandedId !== project._id}
							onClick={() => {
								const card = cardRefs.current.get(project._id);
								if (card) {
									handleCardClick(project._id, card);
								}
							}}
						/>
					</div>
				))}
			</div>
			{expandedId !== null && (
				<div className={styles.backdrop} onClick={closeExpanded} />
			)}
		</div>
	);
}

const styles = {
	wrapper: css`
		position: relative;
		width: 100%;
		min-height: 440px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
	`,
	container: css`
		display: flex;
		gap: 24px;
		overflow-x: auto;
		width: 100%;
		min-height: 440px;
		align-items: center;
		/* Hide scrollbar for clean look */
		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	`,
	cardWrapper: css`
		flex-shrink: 0;
		position: relative;
	`,
	backdrop: css`
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 5;
		cursor: pointer;
	`,
};
