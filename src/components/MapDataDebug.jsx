function MapDataDebug(props) {
    return (
        <div>
            <h1>MapData Debug Viewer</h1>
            <div onChange={updateTopLeftACB}>
                <h2>Screen Top Left Location</h2>
                <label htmlFor="loc_tl_lat">Latitude</label>
                <input type="number" name="loc_tl_lat" id="loc_tl_lat" value={props.screenBoundary.topLeft.latitude} step={0.01} min={58.694936} max={59.542142} />
                <label htmlFor="loc_tl_lon">Longitude</label>
                <input type="number" name="loc_tl_lon" id="loc_tl_lon" value={props.screenBoundary.topLeft.longitude}  step={0.01} min={17.492155} max={19} />
            </div>
            <div onChange={updateBottomRightACB}>
                <h2>Screen Bottom Right Location</h2>
                <label htmlFor="loc_br_lat">Latitude</label>
                <input type="number" name="loc_br_lat" id="loc_br_lat" value={props.screenBoundary.bottomRight.latitude} step={0.01} min={58.694936} max={59.542142} />
                <label htmlFor="loc_br_lon">Longitude</label>
                <input type="number" name="loc_br_lon" id="loc_br_lon" value={props.screenBoundary.bottomRight.longitude} step={0.01} min={17.492155} max={19}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Quay ID</th>
                        <th>Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    { Object.entries(props.quays).map(([id, quay]) => renderQuayCB(quay)) }
                </tbody>
            </table>
        </div>
    )

    function renderQuayCB(quay) {
        return (
            <tr key={quay.id}>
                <td>{quay.id}</td>
                <td>{quay.name}</td>
                <td>{quay.location.latitude}</td>
                <td>{quay.location.longitude}</td>
            </tr>
        )
    }

    function updateTopLeftACB(e) {
        if (e.target.id === "loc_tl_lat") {
            props.updateTopLeft({latitude: parseFloat(e.target.value)})
        } else if (e.target.id === "loc_tl_lon") {
            props.updateTopLeft({longitude: parseFloat(e.target.value)})
        }
    }

    function updateBottomRightACB(e) {
        if (e.target.id === "loc_br_lat") {
            props.updateBottomRight({latitude: parseFloat(e.target.value)})
        } else if (e.target.id === "loc_br_lon") {
            props.updateBottomRight({longitude: parseFloat(e.target.value)})
        }
    }
}

export default MapDataDebug;