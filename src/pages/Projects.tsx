import { css } from "@linaria/core";
import Project from "@/components/Project";
import Scaffold from "@/components/Scaffold";

export default function Projects() {
    const projects = [
        {
            name: "Engagement Predictor",
            description: "Multimodal social media engagement prediction using PixelRec Dataset",
            link: "https://github.com/kmvolv/engagement-predictor",
            language: "Multimodal ML",
            languageColor: "#ff6f61"
        },
        {
            name: "Lecture Note Classifier",
            description: "LLM system to assess lecture note quality and comprehension",
            link: "https://github.com/kmvolv/Note-Classifier",
            language: "LLMs",
            languageColor: "#6b2489"
        },
        {
            name: "NLP Paper Classifier",
            description: "BERT-based research paper classifier with LLM augmentation",
            link: "https://github.com/kmvolv/NLP-Paper-Classifier",
            language: "NLP",
            languageColor: "#2b7489"
        },
        {
            name: "Cell Counter",
            description: "Vision Transformer for automated cell counting in microscopy",
            link: "https://github.com/IAmHedgehog/571Counting/tree/main/MAN",
            language: "ViT",
            languageColor: "rgb(222, 165, 132)"
        },
        {
            name: "PCB Defect Detector",
            description: "YOLOv8 GUI for automated PCB defect detection and localization",
            link: "https://github.com/kmvolv/Automated-Board-Defect-Detection",
            language: "YOLOv8",
            languageColor: "#a97bff"
        },
        {
            name: "Annotation Tool",
            description: "Custom polygonal annotation tool for image segmentation",
            link: "https://github.com/kmvolv/tkinter-poly-anno",
            language: "Python",
            languageColor: "#5e5086"
        },
        {
            name: "Vigrah",
            description: "Smart India Hackathon Grand Finale Project with research paper",
            link: "https://github.com/yash-agrawal20/SIH2022-Finals-Vigrah",
            language: "MobileNet",
            languageColor: "#d4af37"
        },
        {
            name: "FunSwap",
            description: "Real-time face swapping with MediaPipe and interactive GUI",
            link: "https://github.com/kmvolv/FunSwap",
            language: "MediaPipe",
            languageColor: "#00add8"
        },
        {
            name: "remBot",
            description: "WhatsApp bot for coding contest reminders",
            link: "https://github.com/kmvolv/remBot",
            language: "NodeJS",
            languageColor: "#89e051"
        },
        {
            name: "oldSchoolChef",
            description: "Browser extension restoring CodeChef's classic UI",
            link: "https://github.com/kmvolv/oldSchoolChef",
            language: "JavaScript",
            languageColor: "#ffde21"
        },
        {
            name: "Laptop Price Predictor",
            description: "Regression model with web-scraped Flipkart data",
            link: "https://github.com/kmvolv/laptop-price-predict",
            language: "ML",
            languageColor: "#123456"
        }
    ];

    return (
        <Scaffold headerText={["my", "projects"]} buttonLink="/contact">
            <div className={styles.projectHolder}>
                {projects.map((project) => (
                    <Project key={project.name} {...project} />
                ))}
            </div>
        </Scaffold>
    );
}

const styles = {
    projectHolder: css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 12px;
        max-width: 100%;
        padding: 10px;
    `,
};