import styles from "../css/About.module.css";

function AttributionView() {
	return (
	  <section>
		<div id={styles.body}>
			<div id={styles.inner} className="drop-shadow rounded-corners">
			<h1>Attribution</h1>
			<p>
				This project was made possible thanks to the contributions of the following tools, libraries, and individuals.
			</p>
			<h2>Tools and Libraries</h2>
			<ul>
				<li>
				<strong>React:</strong> A JavaScript library for building user interfaces. <a href="https://reactjs.org" target="_blank">Learn more</a>
				</li>
				<li>
				<strong>Redux:</strong> A library for simple, scalable state management. <a href="https://redux.js.org/" target="_blank">Learn more</a>
				</li>
				{/* More */}
			</ul>
			<h2>Images and Icons</h2>
			<ul>
				<li>
				Icons provided by <a href="https://tabler.io/icons" target="_blank">Tabler icons</a>
				</li>
				{/* More */}
			</ul>
			<h2>People {/* Maybe for the tester we got feedback from? Or our coach? */} </h2> 
			<ul>
				<li>
				<strong>Name:</strong> [...]
				</li>
				<li>
				<strong>Name:</strong> [...]
				</li>
			</ul>
			</div>
		</div>
	  </section>
	);
  }
  
  export default AttributionView;
  
