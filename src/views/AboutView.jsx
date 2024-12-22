import styles from "../css/InfoPages.module.css";
import backgroundJPG from "../media/background.jpg"


function AboutView() {
	return (
		<>
		<img id={styles.backgroundImage} src={backgroundJPG} alt="Background Image" />
		<section>
			<div id={styles.body}>
				<div id={styles.inner} className={`blurred-background rounded-corners drop-shadow`}>
					<h1>About The Project</h1>
					<p className={styles.bottomMargin}>
						BusTrackr is app created by Jonathan Värild, Lukas Nordström and Samuel Brodin as the project part of the course DH2642 Interaction Programming and the
						Dynamic Web (iprogdh) at KTH Royal Institute of Technology in Sweden. The application allows users to track Stockholm local transport buses on a live map,
						create their own account, track favorite buses, etc.
					</p>
					<p>
						Check out the{" "}
						<a href="https://github.com/JonathanVarild/BusTrackr" target="_blank">
							GitHub Repository
						</a>{" "}
						for more details.
					</p>
					<p>
						Check out the backend{" "}
						<a href="https://github.com/Vuroz/BusTrackr-Server" target="_blank">
							here.
						</a>{" "}
					</p>
					<h2>The Team</h2>
					<ul>
						<li>
							<strong>Jonathan Värild</strong>
							<ul>
								<li>Second-year student in the Degree Programme in Computer Engineering (TIDAB)</li>
								<li>
									<a href="https://www.linkedin.com/in/jonathanvärild/">LinkedIn</a>
								</li>
							</ul>
						</li>
						<li>
							<strong>Lukas Nordström</strong>
							<ul>
								<li>Second-year student in the Degree Programme in Computer Engineering (TIDAB)</li>
								<li>
									<a href="https://www.linkedin.com/in/lukas-nordström-27959528a/">LinkedIn</a>
								</li>
							</ul>
						</li>
						<li>
							<strong>Samuel Brodin</strong>
							<ul>
								<li>Second-year student in the Degree Programme in Computer Engineering (TIDAB)</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</section>
		</>
	);
}

export default AboutView;
