export const EMULATOR_API = "10.0.2.2";

export const config = {
  server: {
    url: `http://${EMULATOR_API}:8001`, //http://localhost:8001 10.0.2.2 https://bulletjournalproject.herokuapp.com
  },
};

export const API_URL = `${config.server.url}/api/v1`;
