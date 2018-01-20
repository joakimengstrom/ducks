import React from 'react';

const SightingsItem = (props) => {
	const sighting = props.sighting		
	return (
		<li key={sighting.id} class="list">
          <div class="date">
          {sighting.dateTime}
          </div> 
          <div>
          Species: {sighting.species}
          </div>
          <div>
          Description: {sighting.description}
          </div> 
          <div>
          Count: {sighting.count}
          </div>
          </li>
		)
}

export default SightingsItem;