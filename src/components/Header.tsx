import { css, cx } from "@linaria/core";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useThemeStore } from "@/stores/theme-store";
import { LayoutIds } from "@/utils/constants";
import ColoredLine from "./ColoredLine";
import Spacer from "./generic/Spacer";
import ShapeSun from "assets/shapes.svg?react";
import ShapeMoon from "assets/moon.svg?react";

export default function Header(props: { text: [string, string] }) {
    const { theme, toggleTheme, setRandomAccent } = useThemeStore();
    const [showSun, setShowSun] = useState(theme.type === "light");
    const [hasClicked, setHasClicked] = useState(false);

    // Update showSun state when theme changes externally
    useEffect(() => {
        setShowSun(theme.type === "light");
    }, [theme.type]);
    
    const titleLayoutIds =
        props.text[0].length > props.text[1].length
            ? [LayoutIds.Title1, LayoutIds.Title2]
            : [LayoutIds.Title2, LayoutIds.Title1];
    
    // Handle icon toggle and theme change
    const handleIconClick = () => {
        setShowSun(!showSun); // Toggle the icon
        toggleTheme(); // Toggle the theme
        setHasClicked(true); // Mark that we've clicked
    };

    return (
        <div className={styles.container}>
            <div className={cx("flex", "full-width", "align-items-center")}>
                {/* Shapes with toggle animation */}
                <motion.div 
                    layoutId={LayoutIds.Shapes} 
                    layout="position"
                    style={{ 
                        position: "relative",
                        width: "min(18vw, 82px)",
                        height: "min(18vw, 82px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 2
                    }}
                >
                    <AnimatePresence mode="sync">
                        {showSun && (
                            <motion.div
                                key="sun"
                                initial={hasClicked ? { 
                                    opacity: 0,
                                    rotate: -180,
                                    scale: 0.8
                                } : { opacity: 1 }}
                                animate={{ 
                                    opacity: 1,
                                    rotate: 0,
                                    scale: 1,
                                    transition: { 
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }
                                }}
                                exit={hasClicked ? { 
                                    opacity: 0,
                                    rotate: 180,
                                    scale: 0.8,
                                    transition: { 
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }
                                } : { opacity: 0 }}
                                style={{
                                    position: "absolute",
                                    cursor: "pointer"
                                }}
                                onClick={handleIconClick}
                            >
                                <ShapeSun 
                                    fill={theme.accent} 
                                    stroke={theme.accent} 
                                    className={styles.shapes} 
                                />
                            </motion.div>
                        )}
                        {!showSun && (
                            <motion.div
                                key="moon"
                                initial={hasClicked ? { 
                                    opacity: 0,
                                    rotate: -180,
                                    scale: 0.8
                                } : { opacity: 1 }}
                                animate={{ 
                                    opacity: 1,
                                    rotate: 0,
                                    scale: 1,
                                    transition: { 
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }
                                }}
                                exit={hasClicked ? { 
                                    opacity: 0,
                                    rotate: 180,
                                    scale: 0.8,
                                    transition: { 
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }
                                } : { opacity: 0 }}
                                style={{
                                    position: "absolute",
                                    cursor: "pointer"
                                }}
                                onClick={handleIconClick}
                            >
                                <ShapeMoon 
                                    fill={theme.accent} 
                                    stroke="white" 
                                    className={styles.shapes} 
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                <Spacer horizontal={14} />
                {/* Title 1 */}
                <motion.p
                    layoutId={titleLayoutIds[0]}
                    className={styles.about}
                    style={{ color: theme.text }}
                    layout="position"
                >
                    {props.text[0]}
                </motion.p>
                <Spacer horizontal={8} />
                {/* Title 2 */}
                <motion.p
                    layoutId={titleLayoutIds[1]}
                    className={styles.me}
                    style={{ color: theme.accent }}
                    onClick={setRandomAccent}
                    layout="position"
                >
                    {props.text[1]}
                </motion.p>
            </div>
            <Spacer vertical={12} />
            <ColoredLine />
        </div>
    );
}

const styles = {
    container: css`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    shapes: css`
        width: min(18vw, 82px);
        height: auto;
    `,
    about: css`
        font-size: min(8vw, 34px);
        font-family: Manrope;
    `,
    me: css`
        font-size: min(8vw, 34px);
        font-family: Manrope;
        font-weight: bold;
        cursor: pointer;
    `,
};