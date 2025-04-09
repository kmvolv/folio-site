import { css } from "@linaria/core";
import { PropsWithChildren, useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Scaffold from "@/components/Scaffold";
import { useThemeStore } from "@/stores/theme-store";
import { lumenColor, yearsFromBirthday, timeFromDate } from "@/utils/utils";

// Define a type for our puzzle keys to make TypeScript happy
type PuzzleKey = 'mastermorphix' | 'megaminx' | 'square1';

// Define the structure for puzzle data
interface PuzzleData {
  gifPath: string;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export default function About() {
    const { theme } = useThemeStore();
    const [time, setTime] = useState(timeFromDate());
    const navigate = useNavigate();
    const scrollTimeoutRef = useRef<number | null>(null);
    const [scrolling, setScrolling] = useState(false);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [activeHoverImage, setActiveHoverImage] = useState<PuzzleKey | null>(null);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

    const scrollEnabledTimeRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(timeFromDate());
        }, 1000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        scrollEnabledTimeRef.current = Date.now() + 500;
        setIsInitialLoadComplete(true);
        return () => {};
    }, []);

    const handleWheel = useCallback((event: WheelEvent) => {
        if (Date.now() < scrollEnabledTimeRef.current || scrolling) return;
        
        setScrolling(true);
        
        if (scrollTimeoutRef.current !== null) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        if (event.deltaY > 0) {
            navigate('/projects');
        } else if (event.deltaY < 0) {
            navigate('/');
        }
        
        scrollTimeoutRef.current = window.setTimeout(() => {
            setScrolling(false);
        }, 1000);
    }, [navigate, scrolling]);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeoutRef.current !== null) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleWheel]);

    // Dictionary mapping puzzle names to their respective GIF data
    const puzzleData: Record<PuzzleKey, PuzzleData> = {
        mastermorphix: {
            gifPath: '/mastermorphix.jpg',
            offsetX: -100, // Customize as needed
            offsetY: -195, // Customize as needed
            width: 200,
            height: 175
        },
        megaminx: {
            gifPath: '/megaminx.jpg',
            offsetX: -100, // Customize as needed
            offsetY: -220, // Customize as needed
            width: 200,
            height: 200
        },
        square1: {
            gifPath: '/square1.jpg',
            offsetX: -100, // Customize as needed
            offsetY: -170, // Customize as needed
            width: 200,
            height: 150
        }
    };

    // Map to convert display names to keys
    const puzzleNameToKey: Record<string, PuzzleKey> = {
        'Mastermorphix': 'mastermorphix',
        'Megaminx': 'megaminx',
        'Square-1': 'square1'
    };

    // Handle hover for puzzle images
    const handleMouseEnter = (puzzleName: string, e: React.MouseEvent) => {
        const key = puzzleNameToKey[puzzleName];
        if (key) {
            setActiveHoverImage(key);
            updateHoverPosition(e);
        }
    };

    const handleMouseLeave = () => {
        setActiveHoverImage(null);
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (activeHoverImage) {
            updateHoverPosition(e);
        }
    };
    
    const updateHoverPosition = (e: React.MouseEvent) => {
        // Basic position - will be adjusted with offsets
        setHoverPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    // ACCented Text
    const Act = useCallback(
        ({ children }: PropsWithChildren<{}>) => {
            return (
                <span
                    style={{
                        color: lumenColor(theme.accent, 25),
                        fontWeight: "500",
                    }}
                >
                    {" "}
                    {children}
                </span>
            );
        },
        [theme],
    );

    // Puzzle component with hover effect
    const Puzzle = ({ name }: { name: string }) => {
        return (
            <span 
                className={styles.puzzle}
                onMouseEnter={(e) => handleMouseEnter(name, e)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <Act>{name}</Act>
            </span>
        );
    };

    return (
        <Scaffold headerText={["about", "me"]} buttonLink="/projects">
            <div className={styles.container}>
                <p className={styles.text} style={{ color: theme.text }}>
                    I'm a {yearsFromBirthday()} year old graduate student at <Act>Iowa State University</Act>. I'm currently pursuing a master's degree in <Act>Artificial Intellgence</Act>
                    <br /> My fascination with AI began before I began my undergrad journey, when I stumbled upon a <Act>Deep Learning</Act> course on Coursera, and I was instantly hooked.
                    <br />
                    <br /> Over the years I've developed projects spanning across various domains, including but certainly not limited to <Act>Computer Vision</Act>, <Act>Natural Language Processing</Act>, and <Act>Reinforcement Learning</Act>.
                    <br /> I'd love to apply my skills to real-world problems and am always on the lookout for new opportunities!
                    <br />
                    <br /> Currently, I'm working on a couple of projects:
                    <br /> • <Act>Evaluation of Note-taking</Act> - A <Act>NLP-based Classifier</Act> to determine if the attendees of a lecture are able to capture all the important key points addressed.
                    <br /> • <Act>AI Commentator</Act> - Commentary system powered by <Act>GenAI</Act> that generates realistic, engaging commentary in the style of the undisputed GOAT, Peter Drury.
                    <br />
                    <br /> While I'm not busy racking my brain with projects and assigments, you'll probably find me:
                    <br /> • Unwinding at the <Act>Gym</Act>, working on my fitness and trying to demolish my PRs!
                    <br /> • Watching my favorite football team, <Act>Arsenal</Act> fumble yet another Premier League title.
                    <br /> <span className={styles.hiddenbullet}>•</span> (It's been <Act>{time.years} years, {time.days} days, {time.hours} hours, {time.minutes} minutes, and {time.seconds} seconds</Act> since they last won the title!)
                    <br /> • Getting my brain twisted (and sometimes my fingers too) with puzzles like the <Puzzle name="Mastermorphix" />, <Puzzle name="Megaminx" />, and <Puzzle name="Square-1" />
                    <br /> 
                </p>

                {/* Hover GIF popup with custom positioning for each puzzle */}
                {activeHoverImage && (
                    <div 
                        className={styles.hoverImage}
                        style={{ 
                            top: `${hoverPosition.y + puzzleData[activeHoverImage].offsetY}px`, 
                            left: `${hoverPosition.x + puzzleData[activeHoverImage].offsetX}px`
                        }}
                    >
                        <img 
                            src={puzzleData[activeHoverImage].gifPath}
                            alt={activeHoverImage}
                            width={puzzleData[activeHoverImage].width}
                            height={puzzleData[activeHoverImage].height}
                            className={styles.gifImage}
                        />
                    </div>
                )}
            </div>
        </Scaffold>
    );
}

const styles = {
    container: css`
        position: relative;
    `,
    text: css`
        font-size: min(5vw, 22px);
        font-family: Inter;
        line-height: 1.5;
        color: #e9e9e9;
    `,
    hiddenbullet: css`
        visibility: hidden;
    `,
    puzzle: css`
        position: relative;
        cursor: pointer;
        display: inline-block;
        text-decoration: underline dotted 3px;
        text-decoration-offset: 2px;  /* This moves the underline up a bit */
        text-underline-offset: 2px;   /* Alternative property for newer browsers */
        text-underline-position: under;
    `,
    hoverImage: css`
        position: fixed;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        pointer-events: none;
        transition: opacity 0.2s ease;
    `,
    gifImage: css`
        display: block;
        object-fit: cover;
        border-radius: 2px;
    `
};