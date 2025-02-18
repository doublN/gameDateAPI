type IgdbCredentials = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type GameType = {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  first_release_date: number;
  name: string;
};

export const credentials: IgdbCredentials = {
  access_token: "",
  expires_in: 0,
  token_type: "",
};

export const fetchCredentials = async () => {
  const clientId = process.env.IGDB_CLIENT_ID;
  const clientSecret = process.env.IGDB_CLIENT_SECRET;
  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  const response = await fetch(url, {
    method: "post",
  });

  const body = await response.json();
  credentials.access_token = body?.access_token;
  credentials.expires_in = body?.expires_in;
  credentials.token_type = body?.token_type;
};

export const getGamesBySearch = async (query: string) => {
  const clientId = process.env.IGDB_CLIENT_ID ?? "";
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Client-ID": clientId,
      Authorization: `Bearer ${credentials.access_token}`,
    },
    body: `search "${query}"; fields name,first_release_date,cover.url; limit 10;`,
  });

  return (await response.json()) as Array<GameType>;
};
