import styles from "../css/InfoPages.module.css";

function AboutView() {
	return (
	  <section>
		<div id={styles.body}>
			<div id={styles.inner} className="drop-shadow rounded-corners">
			<h1>About The Project</h1>
			<p>
		  	...Purpose...
			</p>
			<h2>The Team</h2>
			<ul>
		  	<li>
				<strong>Jonathan Värild</strong> [...]
		  	</li>
		  	<li>
				<strong>Lukas Nordström</strong> [...]
		  	</li>
		  	<li>
				<strong>Samuel Brodin</strong> [...]
		  	</li>
			</ul>
			<p>
		  	Check out the <a href="https://github.com/JonathanVarild/BusTrackr" target="_blank">GitHub Repository</a> for more details.
			</p>
			</div>
		</div>
	  </section>
	);
  }
  
  export default AboutView;
