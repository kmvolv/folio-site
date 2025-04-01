import { CSSProperties, css } from "@linaria/core";
import { useCallback, PropsWithChildren, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Scaffold from "@/components/Scaffold";
import { useThemeStore } from "@/stores/theme-store";
import { contact, portfolioSource } from "@/utils/constants";
import { lumenColor } from "@/utils/utils";

export default function Contact() {
    const { theme } = useThemeStore();
    const navigate = useNavigate();
    const scrollTimeoutRef = useRef<number | null>(null);
    const [scrolling, setScrolling] = useState(false);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const scrollEnabledTimeRef = useRef(0); // Reference to track when scroll should be enabled
    
    const linkStyle = {
        color: lumenColor(theme.accent, 32),
        opacity: 0.8,
    } satisfies CSSProperties;
    
    // Set up the initial timing for scroll events
    useEffect(() => {
        // Set the time when scroll events will be enabled (current time + 500ms)
        scrollEnabledTimeRef.current = Date.now() + 500;
        
        // Set initial load complete immediately - we'll control scroll separately
        setIsInitialLoadComplete(true);

        return () => {};
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
            navigate('/');
        } else if (event.deltaY < 0) {
            // Scrolling up - go to previous page (projects)
            navigate('/projects');
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

    const ContactPageLink = useCallback(
        (props: { text: string; to: string }) => {
            return (
                <Link
                    target="_blank"
                    className={styles.link}
                    style={linkStyle}
                    to={props.to}
                >
                    {props.text}
                </Link>
            );
        },
        [linkStyle],
    );
    
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
        <Scaffold
            headerText={["contact", "me"]}
            buttonLink="/"
            rotatedButton
            largeButton
        >
            <p style={{ color: theme.text }} className={styles.text}>
                Like what you see?
                <br />
                Then let's connect on {" "}
                <ContactPageLink to={contact.linkedin} text="LinkedIn" />
                !
                <br />
                You can also reach out via <ContactPageLink to={`mailto:${contact.email}`} text="email" />
                <br />
                <br />
                (<Act>PSSST!</Act> Have you tried clicking the shapes or the <Act>colored text</Act> on the header?)
                <br /> <br />
                Source for this portfolio is{" "}
                <ContactPageLink to={portfolioSource} text="here" />
                . <br />
                Thanks for stopping by!
                <br /><br />
            </p>
        </Scaffold>
    );
}

const styles = {
    text: css`
        font-size: min(5vw, 22px);
        text-align: center;
        line-height: 1.8;
        font-family: Inter;
        font-weight: 500;
        letter-spacing: -0.6px;
        opacity: 0.8;
    `,
    link: css`
        text-decoration: underline;
        font-weight: 500;
    `,
};