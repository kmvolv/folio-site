import { css } from "@linaria/core";
import Project from "@/components/Project";
import Scaffold from "@/components/Scaffold";

export default function Projects() {
	return (
		<Scaffold headerText={["my", "projects"]} buttonLink="/contact">
			<div className={styles.projectHolder}>
				<Project
					name="NLP-Paper-Classifier"
					description="BERT-based research paper classifier using an LLM API for augmentation"
					link="https://github.com/kmvolv/NLP-Paper-Classifier"
					language="NLP, MS Azure"
					languageColor="#2b7489"
				/>

				<Project
					name="Biological Cell Counter"
					description="A Vision Transformer based cell counting for microscopy images"
					link="https://github.com/IAmHedgehog/571Counting/tree/main/MAN"
					language="VGG-19 Transformer"
					languageColor="rgb(222, 165, 132)"
				/>

				<Project
					name="board-defect-detector"
					link="https://github.com/kmvolv/Automated-Board-Defect-Detection"
					description="A GUI to upload PCB images and localize defects present on them"
					language="YOLOv8"
					languageColor="#a97bff"
				/>

				<Project
					name="tkinter-poly-anno"
					link="https://github.com/kmvolv/tkinter-poly-anno"
					description="A polygonal annotation tool for images using Tkinter"
					language="Tkinter"
					languageColor="#5e5086"
				/>

				<Project
					name="Vigrah"
					link="https://github.com/yash-agrawal20/SIH2022-Finals-Vigrah"
					description="Smart India Hackathon Grand Finale Project + Research Paper"
					language="MobileNet"
					languageColor="#d4af37"
				/>
				
				<Project
					name="FunSwap"
					link="https://github.com/kmvolv/FunSwap"
					description="Real-time face swapping application with interactive GUI"
					language="Mediapipe, Tkinter"
					languageColor="#00add8"
				/>

				<Project
					name="remBot"
					link="https://github.com/kmvolv/remBot"
					description="A Whatsapp bot that reminds users of upcoming coding contests"
					language="NodeJS"
					languageColor="#89e051"
				/>

				<Project
					name="oldSchoolChef"
					link="https://github.com/kmvolv/oldSchoolChef"
					description="A simple browser extension that brings back the old UI of Codechef"
					language="JavaScript"
					languageColor="#ffde21"
				/>

				<Project
					name="laptop-price-predict"
					link="https://github.com/kmvolv/laptop-price-predict"
					description="A regression model trained on scraped data from Flipkart"
					language="Regression, Web Scraping"
					languageColor="#123456"
				/>

			</div>
		</Scaffold>
	);
}

const styles = {
	projectHolder: css`
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 10px;
	`,
};
