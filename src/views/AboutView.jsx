import styles from "../css/InfoPages.module.css";

function AboutView() {
	return (
		<section>
			<div id={styles.body}>
				<div id={styles.inner} className="drop-shadow rounded-corners">
					<h1>About The Project</h1>
					<p>
						BusTrackr is app created by Jonathan Värild, Lukas Nordström and Samuel Brodin as the project part of the course DH2642 Interaction Programming and the
						Dynamic Web (iprogdh) at KTH Royal Institute of Technology in Sweden. The application will allow users to track Stockholm local transport buses on a live
						map, create their own account, track favorite buses, etc.
					</p>
					<h2>The Team</h2>
					<ul>
						<li>
							<strong>Jonathan Värild</strong>
							<ul>
								<li>Computer Engineering student of 2023</li>
								<li>
									<a href="https://www.linkedin.com/in/jonathanvärild/">LinkedIn</a>
								</li>
							</ul>
						</li>
						<li>
							<strong>Lukas Nordström</strong>
							<ul>
								<li>Computer Engineering student of 2023</li>
								<li>
									<a href="https://www.linkedin.com/in/lukas-nordström-27959528a/">LinkedIn</a>
								</li>
							</ul>
						</li>
						<li>
							<strong>Samuel Brodin (Computer Engineering student of 2023)</strong>
							<ul>
								<li>Computer Engineering student of 2023</li>
							</ul>
						</li>
					</ul>
					<p>
						Check out the{" "}
						<a href="https://github.com/JonathanVarild/BusTrackr" target="_blank">
							GitHub Repository
						</a>{" "}
						for more details.
					</p>
				</div>
			</div>
		</section>
	);
}

export default AboutView;
