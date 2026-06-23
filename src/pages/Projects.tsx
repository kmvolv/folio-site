import { css } from "@linaria/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Scaffold from "@/components/Scaffold";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Projects() {
	const projects = [
		{
			name: "First Impressions Matter: Predicting Visual Content Popularity",
			description: <>Built multimodal machine learning pipelines combining computer vision and NLP to forecast social media engagement. Designed <strong>cross-modal attention and fusion architectures</strong> using SigLIP and DeBERTa for large-scale popularity prediction on the PixelRec dataset.</>,
			link: "https://github.com/kmvolv/engagement-predictor",
			techStack: ["Multimodal AI", "PyTorch", "Hugging Face"],
		},
		{
			name: "Classification of Lecture Notes for Key Concept Coverage",
			description:
				<> Developed training pipeline with MS Azure to evaluate whether student lecture notes capture key concepts using NLP, transformer models, and LLMs. Benchmarked rule-based, SciBERT, and LLaMA-4, with the latter achieving a <strong>76.7% classification accuracy</strong>, outperforming traditional NLP and transformer baselines.</>,
			link: "https://github.com/kmvolv/Note-Classifier",
			techStack: ["Prompt Engineering", "LLMs", "Fine-tuning", "Azure Cloud"],
		},
		{
			name: "Vigrah: Smart India Hackathon",
			description:
				<>Wrote a <strong>research paper</strong> on a deep learning-based OCR system for recognizing ancient Ashokan Brahmi inscriptions using transfer learning and CNN architectures. Built a dataset of 227K+ augmented images, implemented preprocessing and character segmentation pipelines, and evaluated LeNet, VGG16, and MobileNet models. Achieved <strong>95.94% accuracy</strong> with MobileNet.</>,
			link: "https://github.com/yash-agrawal20/SIH2022-Finals-Vigrah",
			techStack: ["Transfer Learning", "MobileNet", "Research Paper"],
		},
		{
			name: "NLP Research Paper Classifier",
			description:
				<> Designed an NLP system for automated classification of biomedical research papers using transformer models and traditional ML techniques. Fine-tuned DeBERTa, BERT, and SciBERT models, achieving an <strong>F1 score of 86.2%</strong> and significantly outperforming TF-IDF-based baselines. Addressed class imbalance through <strong>synthetic data augmentation with LLMs, SMOTE, and weighted loss</strong> functions</>,
			link: "https://github.com/kmvolv/NLP-Paper-Classifier",
			techStack: ["NLP", "BERT-based Models", "Synthetic Data Augmentation"],
		},
		{
			name: "Microscopic Cell Counter",
			description:
				<>Built a vision transformer trained to predict the count of cells in microscopy images provided by the IDCIA dataset. The training pipeline utilizes <strong>Instance Attention Loss</strong> derived from the CVPR 2022 paper 'Boosting Crowd Counting via Multifaceted Attention' finally achieving a 76% Average Count Precision</>,
			link: "https://github.com/IAmHedgehog/571Counting/tree/main/MAN",
			techStack: ["PyTorch", "Vision Transformer (ViT)"],
		},
		{
			name: "PCB Defect Detector",
			description:
				<> YOLOv8-powered object detection system for automated PCB defect detection and localization along with a functional GUI set up with Tkinter. After implementing data augmentation through image transformation, the system achieved a <strong>98% mean average precision</strong>, outperforming other models such as EfficientDet and Facebook's Detectron2.</>,
			link: "https://github.com/kmvolv/Automated-Board-Defect-Detection",
			techStack: ["YOLOv8", "Tkinter", "Image Augmentation"],
		},
		{
			name: "Polygonal Annotation Tool",
			description: <>Custom polygonal annotation tool for image segmentation developed purely with Tkinter, enabling users to create and edit polygonal annotations on images. The tool supports functionalities such as zooming, panning, and saving annotations in JSON format, <strong>streamlining the annotation process for computer vision datasets</strong>.</>,
			link: "https://github.com/kmvolv/tkinter-poly-anno",
			techStack: ["Python", "Tkinter", "Image Processing"],
		},
		{
			name: "FunSwap: Real-time Face Swapping",
			description:
				<>Mediapipe-powered real-time face swapping application that utilizes <strong>Delaunay triangulation</strong> and <strong>affine transformations</strong> to seamlessly swap faces in live video/photo inputs with minimal latency. Wrapped in a user-friendly GUI built with the Kivy framework.</>,
			link: "https://github.com/kmvolv/FunSwap",
			techStack: ["MediaPipe", "Kivy", "OpenCV"],
		},
		{
			name: "remBot: Competitive Coding Contest Reminder Bot",
			description: <>A <strong>Node.js Whatsapp bot</strong> that utilizes the CLIST API (collection of all upcoming competitive coding contests) to give user information about upcoming coding contests through a Whatsapp message. Set up custom commands to interact with the bot and help it set reminders for contests the user is interested in.</>,
			link: "https://github.com/kmvolv/remBot",
			techStack: ["Node.js", "JavaScript"],
		},
		{
			name: "oldSchoolChef",
			description: <>A simple browser extension restoring CodeChef's classic UI built out of <strong>pure hatred</strong> against the new Codechef UI.</>,
			link: "https://github.com/kmvolv/oldSchoolChef",
			techStack: ["JavaScript", "Chrome Extension"],
		},
		{
			name: "Laptop Price Predictor",
			description: <>Trained an <strong>XGBoost regression model</strong> on web-scraped data of laptops listed on the Flipkart website extracted using <strong>BeautifulSoup</strong>. The trained model can predict the price of a laptop based on the specifications desired by the user.</>,
			link: "https://github.com/kmvolv/laptop-price-predict",
			techStack: ["Web Scraping", "Scikit-learn", "Pandas"],
		},
	];

	const navigate = useNavigate();
	const scrollTimeoutRef = useRef<number | null>(null);
	const [scrolling, setScrolling] = useState(false);
	const scrollEnabledTimeRef = useRef(Date.now() + 500);

	const handleWheel = useCallback(
		(event: WheelEvent) => {
			if (Date.now() < scrollEnabledTimeRef.current || scrolling) return;

			setScrolling(true);

			if (scrollTimeoutRef.current !== null) {
				clearTimeout(scrollTimeoutRef.current);
			}

			if (event.deltaY > 0) {
				// Scrolling down - go to next page (contact)
				navigate("/contact");
			} else if (event.deltaY < 0) {
				// Scrolling up - go to previous page (about)
				navigate("/about");
			}

			scrollTimeoutRef.current = window.setTimeout(() => {
				setScrolling(false);
			}, 1000);
		},
		[navigate, scrolling]
	);

	useEffect(() => {
		window.addEventListener("wheel", handleWheel);
		return () => {
			window.removeEventListener("wheel", handleWheel);
			if (scrollTimeoutRef.current !== null) {
				clearTimeout(scrollTimeoutRef.current);
			}
		};
	}, [handleWheel]);

	return (
		<Scaffold headerText={["my", "projects"]} buttonLink="/contact">
			<div className={styles.projectCarousel}>
				<ProjectCarousel projects={projects} />
			</div>
		</Scaffold>
	);
}

const styles = {
	projectCarousel: css`
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	`,
};
