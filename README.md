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
- Ability to "like" routes.
- Ability to "shuffle" a random bus.
- Making searches based on stop locations ~~or line number.~~
- Showing a ranking of the most looked routes.
- Inactivity detector (don't keep fetching live busses if there is no activity)
- Ability to generate user data report.
- User position and its accuracy shown on map.
- Filter live data based on "liked" routes.
- Backend API ([BusTrackr-Server](https://github.com/Vuroz/BusTrackr-Server), not part of grading 🥲)
    - Endpoint for returning quays based on coordinate bounds.
    - Endpoint for returning stops based on coordinate bounds.
    - Endpoint for returning stop groups
        - Based on coordinate bounds.
        - Based on a list of IDs.
    - Much more, see other repo.

## 🧐 Setup
*Disclaimer: The following setup is only for the front end of the project. Both for development purposes and production deployment, the back end needs to be setup as well. Deploying the project requires a more advanced setup than listed below.*

### Steps
0. Setup the [back end](https://github.com/Vuroz/BusTrackr-Server) and run it 🙏
1. Clone this repo
2. Install the necessary dependencies using npm (`npm i`) or yarn
3. Run `npm run local-dev` to run with local back end.

## 😏 3rd party components
RLayers is a third party component used in `src/presenters/MapPresenter.jsx` and `src/views/RMapView.jsx`

## 💯 Attributions
### OpenStreetMap 
This project uses the OpenStreetMap JavaScript framework for rendering and some of their map data. For more information on OpenStreetMap's copyright and licensing, visit [OpenStreetMap](https://www.openstreetmap.org/copyright/en).

### OpenMapTiles
This project uses map styles from OpenMapTiles which is rendered with mapping data from Geofabrik and OpenStreetMap. For full license information, visit [OpenMapTiles](https://github.com/openmaptiles/openmaptiles/blob/master/LICENSE.md) and [Geofabrik](https://www.geofabrik.de/geofabrik/free.html).