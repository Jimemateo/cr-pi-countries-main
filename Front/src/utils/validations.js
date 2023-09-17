// Esta función se encarga de ordenar la lista de países según varios criterios
export async function countriesOrder(orderTarget, criteria) {
  let orderedCountries = [...orderTarget]; // Inicializar con una copia de la lista original

  if (criteria.name === "Ascendent")
    // Ordenar países por nombre en orden ascendente.
    orderedCountries = orderedCountries.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );

  if (criteria.name === "Descendent")
    // Ordenar países por nombre en orden descendente.
    orderedCountries = orderedCountries.sort((a, b) =>
      a.name < b.name ? 1 : a.name > b.name ? -1 : 0
    );

  if (criteria.population === "Ascendent")
    orderedCountries = orderedCountries.sort((a, b) =>
      a.population > b.population ? 1 : a.population < b.population ? -1 : 0
    );

  if (criteria.population === "Descendent")
    orderedCountries = orderedCountries.sort((a, b) =>
      a.population < b.population ? 1 : a.population > b.population ? -1 : 0
    );

  if (criteria.continent === "Ascendent")
    orderedCountries = orderedCountries.sort((a, b) =>
      a.continent > b.continent ? 1 : a.continent < b.continent ? -1 : 0
    );

  if (criteria.continent === "Descendent")
    orderedCountries = orderedCountries.sort((a, b) =>
      a.continent < b.continent ? 1 : a.continent > b.continent ? -1 : 0
    );

  if (criteria.area === "Ascendent")
    orderedCountries = orderedCountries.sort((a, b) =>
      a.area > b.area ? 1 : a.area < b.area ? -1 : 0
    );

  if (criteria.area === "Descendent")
    orderedCountries = orderedCountries.sort((a, b) =>
      a.area < b.area ? 1 : a.area > b.area ? -1 : 0
    );

  return orderedCountries;
}

// Esta función filtra países según los criterios seleccionados.
export async function filterContinentActivity(orderTarget, criteria) {
  let filteredCountries = [...orderTarget];

  if (criteria.continent) {
    filteredCountries = filteredCountries.filter((country) =>
      country.continent.includes(criteria.continent)
    );
  }

  if (criteria.activities) {
    filteredCountries = filteredCountries.filter((country) => {
      return (
        country.Activities.filter(
          (activity) => activity.name === criteria.activities
        ).length > 0
      );
    });
  }

  return filteredCountries;
}

//Listado de actividades validas:
// const validActivities = [
//   "Hiking", //Senderismo
//   "Swimming",
//   "Sightseeing", //turismo
//   "Camping",
//   "Biking",
//   "Kayak",
//   "Rock Climb",
//   "Surf",
//   "Sky",
//   "Snowboard",
//   "Horse Ride",
//   "Fishing",
//   "Snorkeling",
//   "Scuba Diving",
//   "Bird Watching", //observar aves
//   "Trekking",
//   "Skydiving",
//   "Airplane Jumping",
//   "WindSurf",
//   "Futbol",
//   "Senderismo",
//   "Nadar",
//   "Turismo",
//   "Camping",
//   "Ciclismo",
//   "Kayak",
//   "Escalada en Roca",
//   "Esquí",
//   "Paseo en Caballo",
//   "Pesca",
//   "Snorkel",
//   "Buceo",
//   "Observación de aves",
//   "Caminar",
//   "Correr",
// ];

// Esta función valida la entrada del usuario y devuelve mensajes de error si la validación falla.
export function validate(input) {
  let errors = {};

  if (!input.difficulty) {
    errors.difficulty = "A difficulty level is required";
  } else if (/^[0-5]$/.test(input.difficulty)) {
    errors.difficulty = "You should only enter numbers from 1 to 5";
  }

  if (!input.name) {
    errors.name = "An activity name is required";
  } else {
    // const newActivity = input.name.trim().toUpperCase();
    // if (!validActivities.includes(newActivity)) {
    //   errors.name = "Invalid activity name";
    // }

    if (input.name.length > 18) {
      errors.name = "Activity name should have a maximum of 15 characters";
    }

    const maxWords = input.name.split(" ");
    if (maxWords.length > 2) {
      errors.name = "Activity name should have a maximum of 2 words";
    }

    if (!/^[a-zA-Z\s]+$/.test(input.name)) {
      errors.name = "Activity name should only contain letters";
    }
  }

  if (!input.season) {
    errors.season = " A season name is required";
  }

  if (!input.duration) {
    errors.duration = "Activity duration in hours is required";
  } else if (input.duration > 24 || input.duration < 1) {
    errors.duration = "Duration must be between 1 and 24!";
  }

  if (!input.country) {
    errors.country = "At least one country name is required";
  }
  return errors;
}
