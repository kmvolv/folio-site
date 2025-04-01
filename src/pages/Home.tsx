import { css, cx } from "@linaria/core";
import { Transition, motion } from "framer-motion";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
import ColoredLine from "@/components/ColoredLine";
import NextButton from "@/components/NextButton";
import Spacer from "@/components/generic/Spacer";
import { animationContext } from "@/contexts/animation-context";
import { useThemeStore } from "@/stores/theme-store";
import { LayoutIds } from "@/utils/constants";
import { fade, objectIf } from "@/utils/utils";
import Shapes from "assets/shapes.svg?react";

export default function Home() {
    const { theme, toggleTheme, setRandomAccent } = useThemeStore();
    const [disableAnimations, setDisableAnimations] = useContext(animationContext);
    const navigate = useNavigate(); // Use React Router's navigate
    const scrollTimeoutRef = useRef<number | null>(null);
    const [scrolling, setScrolling] = useState(false);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const scrollEnabledTimeRef = useRef(0); // Reference to track when scroll should be enabled

    const initialDelay = 0.4;

    const timings = {
        line: { duration: 0.3, delay: initialDelay, type: "spring" },
        shapes: { duration: 1, delay: initialDelay + 0.678, type: "spring" },
        text: { duration: 1, delay: initialDelay + 0.7, type: "spring" },
        button: { delay: initialDelay + 1.7, type: "spring" },
        hint: { delay: 0, type: "spring", stiffness: 100, damping: 10 },
    } as const satisfies Record<string, Transition>;

    // Greetings array
    const greetings = [
        "Hello!", "Bonjour!", "Olá!", "नमस्ते!", "Ciao!", "السلام عليكم", "你好!", "Hallo!",
        "Привет!","Γειά σου!", "Hej!", "Merhaba!", "שלום!"
    ];

    // State for rotating greetings
    const [greetingIndex, setGreetingIndex] = useState(0);

    useEffect(() => {
        // Set the time when scroll events will be enabled (current time + 500ms)
        scrollEnabledTimeRef.current = Date.now() + 500;
        
        // Set initial load complete immediately - we'll control scroll separately
        setIsInitialLoadComplete(true);

        // Show the hint message after a few seconds
        const hintTimeout = setTimeout(() => {
            setShowHint(true);
        }, 3500);

        return () => {
            clearTimeout(hintTimeout);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 2000); // Change greeting every 2 seconds

        return () => clearInterval(interval);
    }, []);

    // Handle wheel events for page navigation with time-based control
    const handleWheel = useCallback((event: WheelEvent) => {
        // Check if current time is past our scroll enabled time and not already scrolling
        if (Date.now() < scrollEnabledTimeRef.current || scrolling) return;
        
        // Set scrolling state to prevent multiple triggers
        setScrolling(true);
        
        // Clear any existing timeout
        if (scrollTimeoutRef.current !== null) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        // Check scroll direction
        if (event.deltaY > 0) {
            // Scrolling down - go to next page (home)
            navigate('/about');
        } else if (event.deltaY < 0) {
            // Scrolling up - go to previous page (projects)
            navigate('/contact');
        }
        
        // Set a timeout to reset the scrolling state (debounce)
        scrollTimeoutRef.current = window.setTimeout(() => {
            setScrolling(false);
        }, 1000); // Prevent multiple triggers within 1 second
    }, [navigate, scrolling]);

    useEffect(() => {
        // Add wheel event listener
        window.addEventListener('wheel', handleWheel);

        // Cleanup
        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeoutRef.current !== null) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleWheel]);

    // Define a custom spring transition
    const springTransition = {
        type: "spring",
        stiffness: 350,
        damping: 30
    };

    return (
        <div className={cx("fill", "flex", "flex-center-children")}>
            <div className="flex-col">
                {/* Colored Line */}
                <ColoredLine
                    {...objectIf(!disableAnimations, {
                        initial: { width: "0%" },
                        animate: { width: "100%" },
                    })}
                    transition={timings["line"]}
                />

                <Spacer vertical={26} />

                {/* Home Content */}
                <div style={{ marginLeft: 4, marginRight: 40 }}>
                    {/* Shapes */}
                    <motion.div
                        layout="position"
                        layoutId="shapes"
                        style={{ cursor: "pointer" }}
                        {...fade(timings["shapes"], disableAnimations)}
                        onClick={toggleTheme}
                    >
                        <Shapes fill={theme.accent} className={styles.shapes} />
                    </motion.div>

                    <Spacer vertical={6} />

                    {/* Greeting Text with LayoutGroup to coordinate animations */}
                    <LayoutGroup id="greeting-line">
                        <div 
                            className={styles.helperText} 
                            style={{ 
                                color: theme.text,
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "nowrap"
                            }}
                        >
                            {/* Current greeting with fade animation */}
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={greetings[greetingIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {greetings[greetingIndex]}
                                </motion.span>
                            </AnimatePresence>
                            
                            {/* Smooth Animation */}
                            <motion.span
                                layout
                                transition={springTransition}
                                style={{ marginLeft: 8 }}
                            >
                                I&apos;m
                            </motion.span>
                        </div>
                    </LayoutGroup>

                    <Spacer vertical={6} />

                    {/* Name Text */}
                    <motion.p
                        {...fade(timings["text"], disableAnimations)}
                        style={{ color: theme.accent }}
                        className={styles.nameText}
                        layoutId={LayoutIds.Title2}
                        layout="position"
                        onClick={setRandomAccent}
                        onAnimationComplete={() => {
                            setDisableAnimations(true);
                        }}
                    >
                        Rohail Alam
                    </motion.p>

                    <Spacer vertical={24} />

                    <div style={{ position: "relative", display: "inline-block" }}>
                        <NextButton
                            buttonLink="/about"
                            motion={fade(timings["button"], disableAnimations)}
                        />

                        {/* Hint message - Positioned right below the button */}
                        <AnimatePresence>
                            {showHint && (
                                <motion.div 
                                    className={styles.hintText}
                                    style={{ color: theme.text }}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 0.7, y: 5 }}
                                    exit={{ opacity: 0 }}
                                    transition={timings["hint"]}
                                >
                                    scroll or click!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    shapes: css`
        width: min(18vw, 84px);
        height: auto;
    `,
    helperText: css`
        color: #fbfbfb;
        font-size: min(10.4vw, 54px);
        line-height: 1.125;
        font-family: Manrope;
    `,
    nameText: css`
        font-size: min(11.2vw, 58px);
        font-weight: 600;
        margin-top: -4px;
        font-family: Manrope;
        cursor: pointer;
        user-select: none;
    `,
    hintText: css`
    position: absolute;
    top: calc(100% + 6px); /* Places hint right below button */
    left: 0%;
    transform: translateX(-50%);
    font-size: min(3.6vw, 14px);
    font-family: "Manrope";
    font-style: italic;
    text-align: center;
    font-weight: 400;
    opacity: 0; /* Start hidden */
    white-space: nowrap;
    `,
};