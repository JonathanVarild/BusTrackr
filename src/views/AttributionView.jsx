import styles from "../css/InfoPages.module.css";
import backgroundJPG from "../media/background.jpg"

function AttributionView() {
	return (
		<>
		<img id={styles.backgroundImage} src={backgroundJPG} alt="Background Image" /><img id={styles.backgroundImage} src={backgroundJPG} alt="Background Image" />
		<section>
			<div id={styles.body}>
				<div id={styles.inner} className="blurred-background drop-shadow rounded-corners">
					<h1>Attribution</h1>
					<p>This project was made possible thanks to the contributions of the following tools, libraries, and individuals.</p>
					<h2>Tools and Libraries</h2>
					<ul>
						<li>
							<strong>React:</strong> A JavaScript library for building user interfaces.{" "}
							<a href="https://reactjs.org" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>Redux:</strong> A library for simple, scalable state management.{" "}
							<a href="https://redux.js.org/" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>RLayers:</strong> A ReactJS library for easy access to OpenLayers and OpenStreetMaps.{" "}
							<a href="https://github.com/mmomtchev/rlayers" target="_blank">
								Learn more
							</a>
						</li>

						<li>
							<strong>OpenStreetMap</strong> A library for rendering your own maps in your web application.{" "}
							<a href="https://www.openstreetmap.org/about" target="_blank">
								Learn more
							</a>
						</li>
					</ul>
					<h2>Mapping</h2>
					<ul>
						<li>
							<strong>OpenMapTiles</strong> Custom styles for maps generated for OpenStreetMaps.{" "}
							<a href="https://openmaptiles.org/" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>GeoFabrik</strong> Geographical data for generating mapping data.{" "}
							<a href="https://www.geofabrik.de/" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>Planetiler</strong> A tool for generating mapping data from geographical data.{" "}
							<a href="https://github.com/onthegomap/planetiler" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>Tileserver GL</strong> A self-hosted service for providing map tiles to custom mapping services.{" "}
							<a href="https://github.com/maptiler/tileserver-gl" target="_blank">
								Learn more
							</a>
						</li>
					</ul>

					<h2>Other</h2>
					<ul>
						<li>
							<strong>Debian</strong> Linux distribution for server hosting.{" "}
							<a href="https://www.debian.org/" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>Nginx</strong> A high-performance HTTP server and reverse proxy.{" "}
							<a href="https://nginx.org/" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>PostgreSQL</strong> A powerful, open-source object-relational database system.{" "}
							<a href="https://www.postgresql.org/" target="_blank">
								Learn more
							</a>
						</li>
						<li>
							<strong>Flask</strong> A Python framework for managing HTTP connections.{" "}
							<a href="https://flask.palletsprojects.com/en/stable/" target="_blank">
								Learn more
							</a>
						</li>
					</ul>
					<h2>Images and Icons</h2>
					<ul>
						<li>
							Icons provided by{" "}
							<a href="https://tabler.io/icons" target="_blank">
								Tabler icons
							</a>
						</li>
					</ul>
				</div>
			</div>
		</section>
		</>
	);
}

export default AttributionView;
