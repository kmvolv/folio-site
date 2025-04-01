import { css } from "@linaria/core";
import { PropsWithChildren, useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
import Scaffold from "@/components/Scaffold";
import { useThemeStore } from "@/stores/theme-store";
import { lumenColor, yearsFromBirthday, timeFromDate } from "@/utils/utils";

export default function About() {
    const { theme } = useThemeStore();
    const [time, setTime] = useState(timeFromDate());
    const navigate = useNavigate(); // Use React Router's navigate
    const scrollTimeoutRef = useRef<number | null>(null);
    const [scrolling, setScrolling] = useState(false);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

    const scrollEnabledTimeRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(timeFromDate());
        }, 1000); // Update every second
        return () => clearInterval(interval); // Cleanup on unmount
    });

    useEffect(() => {
        // Set the time when scroll events will be enabled (current time + 500ms)
        scrollEnabledTimeRef.current = Date.now() + 500;
        
        // Set initial load complete immediately - we'll control scroll separately
        setIsInitialLoadComplete(true);

        return () => {};
    }, []);

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
            navigate('/projects');
        } else if (event.deltaY < 0) {
            // Scrolling up - go to previous page (projects)
            navigate('/');
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

    // ACCented Text, written shortly so it's easier to use
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

    return (
        <Scaffold headerText={["about", "me"]} buttonLink="/projects">
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
                <br /> <span className={styles.hiddenbullet}>•</span> It's been <Act>{time.years} years, {time.days} days, {time.hours} hours, {time.minutes} minutes, and {time.seconds} seconds</Act> since they last won the title!
                <br />
                <br /> I'd write more, but my pizza is getting cold.
            </p>
        </Scaffold>
    );
}

const styles = {
    text: css`
        font-size: min(5vw, 22px);
        font-family: Inter;
        line-height: 1.5;
        color: #e9e9e9;
    `,
	hiddenbullet: css`
        visibility: hidden;
    `,
};