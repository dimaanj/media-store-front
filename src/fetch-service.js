import { isEmpty } from "lodash";
import axios from "axios";

const BROWSE_TRACKS_SERVICE = "http://localhost:4004/browse-tracks";

const constructGenresQuery = (genreIds) => {
  return !isEmpty(genreIds)
    ? " and " + genreIds.map((value) => `genre_ID eq ${value}`).join(" or ")
    : "";
};

const fetchTacks = (
  isAuthenticated = false,
  { $top = 20, $skip = 0, genreIds = [], substr = "" } = {}
) => {
  const entityName = isAuthenticated ? "MarkedTracks" : "Tracks";

  const serializeTracksUrl = () => {
    return `$expand=genre&$top=${$top}&$skip=${$skip}&$filter=${
      `contains(name,'${substr}')` + constructGenresQuery(genreIds)
    }`;
  };

  return axios.get(`${BROWSE_TRACKS_SERVICE}/${entityName}`, {
    params: {},
    paramsSerializer: () => serializeTracksUrl(),
  });
};

const countTracks = (
  isAuthenticated = false,
  { genreIds = [], substr = "" } = {}
) => {
  const entityName = isAuthenticated ? "MarkedTracks" : "Tracks";
  return axios.get(
    `${BROWSE_TRACKS_SERVICE}/${entityName}/$count?$filter=${
      `contains(name,'${substr}')` + constructGenresQuery(genreIds)
    }`
  );
};

const fetchGenres = () => {
  return axios.get(`${BROWSE_TRACKS_SERVICE}/Genres`);
};

export { fetchTacks, countTracks, fetchGenres };
