# 📍BusTrackr
BusTrackr is app created by [Jonathan Värild](mailto:varild@kth.se), [Lukas Nordström](mailto:luknor@kth.se) and [Samuel Brodin](mailto:samuelbr@kth.se) as the project part of the course *DH2642 Interaction Programming and the Dynamic Web (iprogdh)*. The application will allow users to track Stockholm local transport buses on a live map, create their own account, track favorite buses, etc.

## ✅ Features
- Responsive UI for desktop, mobile, and tablet.
- Interactive map using OpenMapTiles and OpenStreetMap.
    - Interactive blips for all quays that react to the cursor.
    - Blips and accuracy circle for user location.
- Header with logo and navbar.
- Controls for zooming and user location.
- Controls for showing favorites, trending, and shuffle.
- Input for search bar.
- Live location of Stockholm local transport buses.
- Bus details when clicking any bus on the map.
- Blending between quays, stops, and stop groups depending on map zoom
- Create a user account, log in, change account settings, etc.
- Backend API ([BusTrackr-Server](https://github.com/Vuroz/BusTrackr-Server), not part of grading 🥲😵)
    - Endpoint for returning quays based on coordinate bounds.
    - Endpoint for returning stops based on coordinate bounds.
    - Endpoint for returning stop groups
        - Based on coordinate bounds.
        - Based on a list of IDs.

## ⏱️ Planned features
- Displaying information about stops when clicked
- Showing a ranking of the most looked at & liked routes
- Ability to "like" routes
- Ability to "shuffle" a random bus
- Making searches based on stop locations or line number.
- Global statistics such as online users.
- The other routes

## 🧰 Project structure
### Root
- `.gitignore`: Contains directories files which git should ignore
- `index.html`: Base HTML file, which React is mounted to
- `package-lock.json`: Generated by npm for locking down dependency versions
- `package.json`: Dependencies for the project is listed here
- `README.md`: The file you're currently reading
- `vite.config.js`: Configuration file for the build tool vite

### .github/workflows
- `build-and-release.yml`: The GitHub actions (e.g. automatically build when pushed to prod).

### src
- `App.jsx`: Main file, contains structure and routes for the entire app
- `index.jsx`: This files wraps App with the Redux store

### src/components
- `ButtonWidgetView.jsx`: React component to render a customizable button, styling and functionality wise, used by many views
- `Counter.jsx`: Temporary view for the counter, used for testing
- `MapControls.jsx`: View that renders interactive controls for the map interface
- `MapDataDebug.jsx`: View for directly rendering mapdata, used for debugging
- `MapSearchBar.jsx`: View that renders an input field to be used as a search bar
- `MapShortcuts.jsx`: View that renders a set of shortcut buttons for map interactions, using the ButtonWidget component
- `NavbarView.jsx`: View that renders a responsive navigation bar for the application

### src/css
- `ButtonWidget.module.css`: Styling used specifically by ButtonWidget
- `global.css`: Global styling for the entire app
- `MapSearchBar.module.css`: Styling used specifically by MapSearchBar
- `MapUI.module.css`: Styling used specifically by MapUI
- `Navbar.module.css`: Styling used specifically by Navbar

### src/media
- `directions.png`: Image rendered on the map when very zoomed in
- `favicon.ico`: The favicon for the app
- `logo.png`: Logo for the app, used in the header

### src/presenters
- `About.jsx`: Presenter for rendering information about the project.
- `AttributionPresenter.jsx`: Presenter for rendering of attribution information.
- `CounterTest.jsx`: Temporary presenter for testing the counter Redux reducers and actions.
- `MapDataDebugPresenter.jsx`: Temporary presenter for showing visualizing data from the quays API calls.
- `MapPresenter.jsx`: Presenter for the map and all its controls, buttons, etc.
- `NavbarPresenter.jsx`: Presenter for the navbar component.

### src/store
- `counter.js`: Temporary reducers and actions for a simple counter that was used for testing.
- `index.js`: Redux store configuration and merging of Redux reducers.
- `interface.js`: Redux reducers and actions managing interface functionality such as the visibility of the hamburger menu.
- `mapData.js`: Redux reducers and actions managing all state about the map such as blips, zoom, etc.

### src/tmp
- `lineCords.js`: Temporary file containing coordinates for a full bus route.


## 💯 Attributions
### OpenStreetMap 
This project uses the OpenStreetMap JavaScript framework for rendering and some of their map data. For more information on OpenStreetMap's copyright and licensing, visit [OpenStreetMap](https://www.openstreetmap.org/copyright/en).

### OpenMapTiles
This project uses map styles from OpenMapTiles which is rendered with mapping data from Geofabrik and OpenStreetMap. For full license information, visit [OpenMapTiles](https://github.com/openmaptiles/openmaptiles/blob/master/LICENSE.md) and [Geofabrik](https://www.geofabrik.de/geofabrik/free.html).