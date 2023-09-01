// Esta función se encarga de ordenar la lista de países según varios criterios
export async function countriesOrder(orderTarget, criteria) {
  let orderedCountries = [...orderTarget]; // Inicializar con una copia de la lista original

  if (criteria.name === "Ascendent")
    // Ordenar países por nombre en orden ascendente.
    orderedCountries = orderTarget.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );

  if (criteria.name === "Descendent")
    // Ordenar países por nombre en orden descendente.
    orderedCountries = orderTarget.sort((a, b) =>
      a.name < b.name ? 1 : a.name > b.name ? -1 : 0
    );

  if (criteria.population === "Ascendent")
    orderedCountries = orderTarget.sort((a, b) =>
      a.population > b.population ? 1 : a.population < b.population ? -1 : 0
    );

  if (criteria.population === "Descendent")
    orderedCountries = orderTarget.sort((a, b) =>
      a.population < b.population ? 1 : a.population > b.population ? -1 : 0
    );

  if (criteria.continent === "Ascendent")
    orderedCountries = orderTarget.sort((a, b) =>
      a.continent > b.continent ? 1 : a.continent < b.continent ? -1 : 0
    );

  if (criteria.continent === "Descendent")
    orderedCountries = orderTarget.sort((a, b) =>
      a.continent < b.continent ? 1 : a.continent > b.continent ? -1 : 0
    );

  if (criteria.area === "Ascendent")
    orderedCountries = orderTarget.sort((a, b) =>
      a.area > b.area ? 1 : a.area < b.area ? -1 : 0
    );

  if (criteria.area === "Descendent")
    orderedCountries = orderTarget.sort((a, b) =>
      a.area < b.area ? 1 : a.area > b.area ? -1 : 0
    );

  return orderedCountries;
}
// Esta función filtra países según los criterios seleccionados.
export async function filterContinentActivity(orderTarget, criteria) {
  let filteredCountries = [];

  if (orderTarget && criteria.activities) {
    // Filtrar países por actividades.
    filteredCountries = orderTarget.filter(
      (country) =>
        country.activities.filter(
          (activity) => activity.name === criteria.activities
        ).length
    );
  }

  return filteredCountries;
}

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
