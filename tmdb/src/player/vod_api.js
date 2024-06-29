import {HOST, PASSWORD, USERNAME} from "./player.js";

/** Get VOD categories
 * @returns {Promise<{category_id: string, category_name: string, parent_id: number}[]>}
 */
export async function getCategories() {
  return VodCategoriesMock;
  const url = `${HOST}/player_api.php?action=get_vod_categories&username=${USERNAME}&password=${PASSWORD}`;
  const response = await fetch(url);

  return await response.json();
}

/**
 * Get VOD streams
 * @param category_id
 * @returns {Promise<{
 *  num: number,
 *  name: string,
 *  stream_type: string,
 *  stream_id: number,
 *  stream_icon: string,
 *  rating: string,
 *  rating_5based: number,
 *  tmdb: string,
 *  trailer: string,
 *  added: string,
 *  is_adult: number,
 *  category_id: string,
 *  category_ids: number[],
 *  container_extension: string,
 *  custom_sid: null,
 *  direct_source: string
 *  }[]>
 */
export async function getStreams(category_id) {
  const url = `${HOST}/player_api.php?action=get_vod_streams&username=${USERNAME}&password=${PASSWORD}&category_id=${category_id}`;
  const response = await fetch(url);
  return await response.json();
}


const VodCategoriesMock = [
  {
    "category_id": "92",
    "category_name": "TOP MOVIES BLURAY (MULTI-SUBS)",
    "parent_id": 0
  },
  {
    "category_id": "99",
    "category_name": "TOP KIDS BLURAY (MULTI-SUBS)",
    "parent_id": 0
  },
  {
    "category_id": "410",
    "category_name": "NETFLIX ASIA",
    "parent_id": 0
  },
  {
    "category_id": "137",
    "category_name": "NETFLIX MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "219",
    "category_name": "NETFLIX MOVIES 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "664",
    "category_name": "NETFLIX ANIMI",
    "parent_id": 0
  },
  {
    "category_id": "285",
    "category_name": "NETFLIX KIDS",
    "parent_id": 0
  },
  {
    "category_id": "220",
    "category_name": "NETFLIX KIDS 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "437",
    "category_name": "NETFLIX HEVC",
    "parent_id": 0
  },
  {
    "category_id": "1007",
    "category_name": "AMAZON MOVIES 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "440",
    "category_name": "AMAZON MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "1006",
    "category_name": "AMAZON KIDS 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "992",
    "category_name": "AMAZON KIDS",
    "parent_id": 0
  },
  {
    "category_id": "1035",
    "category_name": "AMAZON DOCU-MOVIES 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "1034",
    "category_name": "AMAZON DOCU-MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "1069",
    "category_name": "DISNEY+ MOVIES MENA 3840P",
    "parent_id": 0
  },
  {
    "category_id": "325",
    "category_name": "DISNEY+ MOVIES EU",
    "parent_id": 0
  },
  {
    "category_id": "326",
    "category_name": "DISNEY+ KIDS",
    "parent_id": 0
  },
  {
    "category_id": "431",
    "category_name": "APPLE+ MOVIES 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "327",
    "category_name": "APPLE+ MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "328",
    "category_name": "APPLE+ KIDS",
    "parent_id": 0
  },
  {
    "category_id": "432",
    "category_name": "APPLE+ KIDS 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "763",
    "category_name": "DISCOVERY+ MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "758",
    "category_name": "VIAPLAY MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "759",
    "category_name": "VIAPLAY KIDS",
    "parent_id": 0
  },
  {
    "category_id": "1074",
    "category_name": "DREAMWORKS ANIMATION",
    "parent_id": 0
  },
  {
    "category_id": "1076",
    "category_name": "UNIVERSAL",
    "parent_id": 0
  },
  {
    "category_id": "1075",
    "category_name": "PARAMOUNT PICTURES",
    "parent_id": 0
  },
  {
    "category_id": "310",
    "category_name": "EN - WWE",
    "parent_id": 0
  },
  {
    "category_id": "192",
    "category_name": "EN - DOCUMENTARIES",
    "parent_id": 0
  },
  {
    "category_id": "163",
    "category_name": "EN - NEW RELEASE",
    "parent_id": 0
  },
  {
    "category_id": "429",
    "category_name": "EN - MANGA\/ANIME",
    "parent_id": 0
  },
  {
    "category_id": "636",
    "category_name": "SOCCER BASKETBALL",
    "parent_id": 0
  },
  {
    "category_id": "287",
    "category_name": "EN - DRAMA",
    "parent_id": 0
  },
  {
    "category_id": "119",
    "category_name": "EN - 2020 & OLD",
    "parent_id": 0
  },
  {
    "category_id": "173",
    "category_name": "EN - KIDS",
    "parent_id": 0
  },
  {
    "category_id": "309",
    "category_name": "EN - ADVENTURE",
    "parent_id": 0
  },
  {
    "category_id": "281",
    "category_name": "EN - SCIENCE FICTION",
    "parent_id": 0
  },
  {
    "category_id": "387",
    "category_name": "EN - UFC",
    "parent_id": 0
  },
  {
    "category_id": "275",
    "category_name": "EN - ACTION",
    "parent_id": 0
  },
  {
    "category_id": "282",
    "category_name": "EN - THRILLER",
    "parent_id": 0
  },
  {
    "category_id": "273",
    "category_name": "EN - HORROR",
    "parent_id": 0
  },
  {
    "category_id": "241",
    "category_name": "EN - WESTERNS",
    "parent_id": 0
  },
  {
    "category_id": "274",
    "category_name": "EN - COMEDY",
    "parent_id": 0
  },
  {
    "category_id": "272",
    "category_name": "EN - CONCERTS",
    "parent_id": 0
  },
  {
    "category_id": "388",
    "category_name": "EN - BOXING",
    "parent_id": 0
  },
  {
    "category_id": "170",
    "category_name": "EN - Biblical",
    "parent_id": 0
  },
  {
    "category_id": "217",
    "category_name": "EN - MOVIES 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "218",
    "category_name": "EN - KIDS 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "269",
    "category_name": "EN - CHRISTMAS",
    "parent_id": 0
  },
  {
    "category_id": "225",
    "category_name": "EN - COLLECTIONS",
    "parent_id": 0
  },
  {
    "category_id": "289",
    "category_name": "EN - MUSICAL",
    "parent_id": 0
  },
  {
    "category_id": "288",
    "category_name": "EN - ROMANCE",
    "parent_id": 0
  },
  {
    "category_id": "439",
    "category_name": "EN - WORKOUT",
    "parent_id": 0
  },
  {
    "category_id": "635",
    "category_name": "SOCCER AMERICAN FOOTBALL",
    "parent_id": 0
  },
  {
    "category_id": "639",
    "category_name": "SOCCER RUGBY",
    "parent_id": 0
  },
  {
    "category_id": "638",
    "category_name": "SOCCER HOCKEY",
    "parent_id": 0
  },
  {
    "category_id": "634",
    "category_name": "SOCCER FOOTBALL",
    "parent_id": 0
  },
  {
    "category_id": "637",
    "category_name": "SOCCER BASEBALL",
    "parent_id": 0
  },
  {
    "category_id": "641",
    "category_name": "SOCCER UFC",
    "parent_id": 0
  },
  {
    "category_id": "642",
    "category_name": "SOCCER FORMULA 1",
    "parent_id": 0
  },
  {
    "category_id": "640",
    "category_name": "SOCCER AFL",
    "parent_id": 0
  },
  {
    "category_id": "117",
    "category_name": "DE - FILME ALT & 2022",
    "parent_id": 0
  },
  {
    "category_id": "134",
    "category_name": "DE - KINDER FILME",
    "parent_id": 0
  },
  {
    "category_id": "169",
    "category_name": "DE - NEUE FILME & 2024",
    "parent_id": 0
  },
  {
    "category_id": "627",
    "category_name": "DE - NETFLIX PRODUKTION",
    "parent_id": 0
  },
  {
    "category_id": "611",
    "category_name": "DE - ANIME FILME",
    "parent_id": 0
  },
  {
    "category_id": "1250",
    "category_name": "DE - FILME 3D",
    "parent_id": 0
  },
  {
    "category_id": "1251",
    "category_name": "DE - KINDER 3D",
    "parent_id": 0
  },
  {
    "category_id": "425",
    "category_name": "DE - FILME 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "816",
    "category_name": "DE - DOKUMENTATION",
    "parent_id": 0
  },
  {
    "category_id": "652",
    "category_name": "DE - DISNEY+ PRODUKTION",
    "parent_id": 0
  },
  {
    "category_id": "657",
    "category_name": "DE - IMDB TOP 100",
    "parent_id": 0
  },
  {
    "category_id": "1114",
    "category_name": "DE - BLURAY FILME",
    "parent_id": 0
  },
  {
    "category_id": "426",
    "category_name": "DE - KINDER FILME 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "873",
    "category_name": "DE - AMAZON PRIME PRODUKTION",
    "parent_id": 0
  },
  {
    "category_id": "1204",
    "category_name": "DE - FORMULA 1",
    "parent_id": 0
  },
  {
    "category_id": "655",
    "category_name": "DE - APPLE+ FILME PRODUKTION",
    "parent_id": 0
  },
  {
    "category_id": "869",
    "category_name": "DE - JAMES BOND 007",
    "parent_id": 0
  },
  {
    "category_id": "858",
    "category_name": "DE - STUDIO GHIBLI",
    "parent_id": 0
  },
  {
    "category_id": "846",
    "category_name": "DE - BOLLYWOOD",
    "parent_id": 0
  },
  {
    "category_id": "660",
    "category_name": "DE - ANIME 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "648",
    "category_name": "DE - MARVEL VS DC",
    "parent_id": 0
  },
  {
    "category_id": "244",
    "category_name": "IT - 4K MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "114",
    "category_name": "IT - NUOVA VERSIONE",
    "parent_id": 0
  },
  {
    "category_id": "249",
    "category_name": "IT - DRAMA ROMANTICO",
    "parent_id": 0
  },
  {
    "category_id": "248",
    "category_name": "IT - CLASSICO",
    "parent_id": 0
  },
  {
    "category_id": "251",
    "category_name": "IT - HORROR THRILLER",
    "parent_id": 0
  },
  {
    "category_id": "240",
    "category_name": "IT - AVVENTURA AZIONE",
    "parent_id": 0
  },
  {
    "category_id": "252",
    "category_name": "IT - FANTASTICO FANTASCIENZA",
    "parent_id": 0
  },
  {
    "category_id": "250",
    "category_name": "IT - COMEDIA",
    "parent_id": 0
  },
  {
    "category_id": "444",
    "category_name": "IT - CACCIA",
    "parent_id": 0
  },
  {
    "category_id": "247",
    "category_name": "IT - CARTONI ANIMATI",
    "parent_id": 0
  },
  {
    "category_id": "168",
    "category_name": "NL - BIOSCOOP",
    "parent_id": 0
  },
  {
    "category_id": "84",
    "category_name": "NL - 2022 & OUD",
    "parent_id": 0
  },
  {
    "category_id": "227",
    "category_name": "NL - BIOSCOOP 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "86",
    "category_name": "NL - KINDEREN",
    "parent_id": 0
  },
  {
    "category_id": "737",
    "category_name": "NL - VIDEOLAND",
    "parent_id": 0
  },
  {
    "category_id": "228",
    "category_name": "NL - 4K KINDEREN",
    "parent_id": 0
  },
  {
    "category_id": "1041",
    "category_name": "BE - DOCU-MOVIES (NL)",
    "parent_id": 0
  },
  {
    "category_id": "859",
    "category_name": "PT\/BR - NETFLIX",
    "parent_id": 0
  },
  {
    "category_id": "848",
    "category_name": "PT\/BR - FILMES 1960-2022",
    "parent_id": 0
  },
  {
    "category_id": "862",
    "category_name": "PT\/BR - AMAZON PRIME",
    "parent_id": 0
  },
  {
    "category_id": "850",
    "category_name": "PT\/BR - DOCUMENTACAO",
    "parent_id": 0
  },
  {
    "category_id": "133",
    "category_name": "PT\/BR - FILMES 2023-2024",
    "parent_id": 0
  },
  {
    "category_id": "260",
    "category_name": "PT\/BR - ANIMAÇÃO",
    "parent_id": 0
  },
  {
    "category_id": "861",
    "category_name": "PT\/BR - APPLE TV+",
    "parent_id": 0
  },
  {
    "category_id": "205",
    "category_name": "ES - INFANTILES",
    "parent_id": 0
  },
  {
    "category_id": "1150",
    "category_name": "ES - PELÍCULAS 2024",
    "parent_id": 0
  },
  {
    "category_id": "128",
    "category_name": "ES - PELÍCULAS",
    "parent_id": 0
  },
  {
    "category_id": "682",
    "category_name": "ES - DOCUMENTALES",
    "parent_id": 0
  },
  {
    "category_id": "1274",
    "category_name": "ES - PELÍCULAS ANTIGUAS",
    "parent_id": 0
  },
  {
    "category_id": "887",
    "category_name": "ES - PELÍCULAS 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "1260",
    "category_name": "ES - PELÍCULAS TERROR",
    "parent_id": 0
  },
  {
    "category_id": "888",
    "category_name": "ES - NETFLIX",
    "parent_id": 0
  },
  {
    "category_id": "1146",
    "category_name": "ES - PRIME+",
    "parent_id": 0
  },
  {
    "category_id": "890",
    "category_name": "ES - APPLE TV+",
    "parent_id": 0
  },
  {
    "category_id": "892",
    "category_name": "ES - PARAMOUNT+",
    "parent_id": 0
  },
  {
    "category_id": "889",
    "category_name": "ES - DISNEY+",
    "parent_id": 0
  },
  {
    "category_id": "126",
    "category_name": "FR - 2021 & VIEUX",
    "parent_id": 0
  },
  {
    "category_id": "1093",
    "category_name": "FR - LA DERNIER AJOUTEE",
    "parent_id": 0
  },
  {
    "category_id": "1282",
    "category_name": "FR - RUGBY",
    "parent_id": 0
  },
  {
    "category_id": "1284",
    "category_name": "FR - FILM 2023",
    "parent_id": 0
  },
  {
    "category_id": "1285",
    "category_name": "FR - FILM 2022",
    "parent_id": 0
  },
  {
    "category_id": "171",
    "category_name": "FR - FILMS 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "400",
    "category_name": "FR - ENFANTS",
    "parent_id": 0
  },
  {
    "category_id": "790",
    "category_name": "FR - ANIME",
    "parent_id": 0
  },
  {
    "category_id": "793",
    "category_name": "FR - COMIDIE",
    "parent_id": 0
  },
  {
    "category_id": "794",
    "category_name": "FR - HORREUR",
    "parent_id": 0
  },
  {
    "category_id": "792",
    "category_name": "FR - DRAME",
    "parent_id": 0
  },
  {
    "category_id": "1098",
    "category_name": "FR - DOCUMENTAIRE",
    "parent_id": 0
  },
  {
    "category_id": "791",
    "category_name": "FR - ACTION",
    "parent_id": 0
  },
  {
    "category_id": "1097",
    "category_name": "FR - CRIME",
    "parent_id": 0
  },
  {
    "category_id": "868",
    "category_name": "FR - THRILLER",
    "parent_id": 0
  },
  {
    "category_id": "629",
    "category_name": "FR - NETFLIX FILMS",
    "parent_id": 0
  },
  {
    "category_id": "172",
    "category_name": "FR - ENFANTS 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "1101",
    "category_name": "FR - SCIENCE-FICTION",
    "parent_id": 0
  },
  {
    "category_id": "1100",
    "category_name": "FR - MUSIQUE",
    "parent_id": 0
  },
  {
    "category_id": "818",
    "category_name": "QC - DOCUMENTAIRE",
    "parent_id": 0
  },
  {
    "category_id": "971",
    "category_name": "QC - SPECTACLES",
    "parent_id": 0
  },
  {
    "category_id": "730",
    "category_name": "QC - FILMS VIEILLE",
    "parent_id": 0
  },
  {
    "category_id": "729",
    "category_name": "QC - FILMS NOUVELLE VERSION",
    "parent_id": 0
  },
  {
    "category_id": "731",
    "category_name": "QC - ANIMATION",
    "parent_id": 0
  },
  {
    "category_id": "843",
    "category_name": "QC - NOËL",
    "parent_id": 0
  },
  {
    "category_id": "735",
    "category_name": "QC - NETFLIX",
    "parent_id": 0
  },
  {
    "category_id": "127",
    "category_name": "PL - KINO",
    "parent_id": 0
  },
  {
    "category_id": "313",
    "category_name": "PL - DZIECI",
    "parent_id": 0
  },
  {
    "category_id": "653",
    "category_name": "PL - FILMY 4K",
    "parent_id": 0
  },
  {
    "category_id": "654",
    "category_name": "PL - KIDS 4K",
    "parent_id": 0
  },
  {
    "category_id": "1167",
    "category_name": "GR - NETFLIX",
    "parent_id": 0
  },
  {
    "category_id": "135",
    "category_name": "GR - ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ",
    "parent_id": 0
  },
  {
    "category_id": "1159",
    "category_name": "GR - DISNEY+",
    "parent_id": 0
  },
  {
    "category_id": "1158",
    "category_name": "GR - PRIME AMAZON",
    "parent_id": 0
  },
  {
    "category_id": "815",
    "category_name": "GR - ΠΑΙΔΙΚΑ",
    "parent_id": 0
  },
  {
    "category_id": "1165",
    "category_name": "GR - DOCUMENTARY",
    "parent_id": 0
  },
  {
    "category_id": "1019",
    "category_name": "GR - CHRISTMAS MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "1164",
    "category_name": "GR - APPLE+",
    "parent_id": 0
  },
  {
    "category_id": "1155",
    "category_name": "GR - GREEK THEATER",
    "parent_id": 0
  },
  {
    "category_id": "1018",
    "category_name": "GR - ΚΑΡΑΟΚΕ",
    "parent_id": 0
  },
  {
    "category_id": "1219",
    "category_name": "IL - OLD & ישן",
    "parent_id": 0
  },
  {
    "category_id": "1147",
    "category_name": "IL - NEW RELEASE & הוצאה חדשה",
    "parent_id": 0
  },
  {
    "category_id": "314",
    "category_name": "NORDIC FILM NEW RELEASE",
    "parent_id": 0
  },
  {
    "category_id": "139",
    "category_name": "NORDIC FILM 2022 & OLD",
    "parent_id": 0
  },
  {
    "category_id": "231",
    "category_name": "NORDIC FILM  4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "312",
    "category_name": "NORDIC KIDS",
    "parent_id": 0
  },
  {
    "category_id": "232",
    "category_name": "NORDIC BARN 4K 3840P",
    "parent_id": 0
  },
  {
    "category_id": "1181",
    "category_name": "NORDIC MUSIC",
    "parent_id": 0
  },
  {
    "category_id": "167",
    "category_name": "SVENSKA NYA UTGÅVAN",
    "parent_id": 0
  },
  {
    "category_id": "91",
    "category_name": "SVENSKA BARN",
    "parent_id": 0
  },
  {
    "category_id": "1084",
    "category_name": "NORDIC BECK COMPLETE",
    "parent_id": 0
  },
  {
    "category_id": "90",
    "category_name": "SVENSKA 2020 & GAMMAL",
    "parent_id": 0
  },
  {
    "category_id": "1200",
    "category_name": "SVENSKA AUDIOBOOKS",
    "parent_id": 0
  },
  {
    "category_id": "479",
    "category_name": "SVENSKA FILM",
    "parent_id": 0
  },
  {
    "category_id": "146",
    "category_name": "DANISH FILM",
    "parent_id": 0
  },
  {
    "category_id": "996",
    "category_name": "NORGE FILM",
    "parent_id": 0
  },
  {
    "category_id": "997",
    "category_name": "NORGE BARN",
    "parent_id": 0
  },
  {
    "category_id": "999",
    "category_name": "SUOMEN ELOKUVAT",
    "parent_id": 0
  },
  {
    "category_id": "81",
    "category_name": "RU - MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "1105",
    "category_name": "RU - KIDS",
    "parent_id": 0
  },
  {
    "category_id": "89",
    "category_name": "MT - MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "113",
    "category_name": "BG - MOMVIES",
    "parent_id": 0
  },
  {
    "category_id": "136",
    "category_name": "RO - MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "140",
    "category_name": "AL - FILMAT 2023 & 2024",
    "parent_id": 0
  },
  {
    "category_id": "754",
    "category_name": "AL - FILMAT 1980\/2022",
    "parent_id": 0
  },
  {
    "category_id": "701",
    "category_name": "AL - FEMIJE",
    "parent_id": 0
  },
  {
    "category_id": "87",
    "category_name": "EX - MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "1208",
    "category_name": "KU - BADINI",
    "parent_id": 0
  },
  {
    "category_id": "1207",
    "category_name": "KU - SORANI",
    "parent_id": 0
  },
  {
    "category_id": "1246",
    "category_name": "KU - CARTOON SORANI",
    "parent_id": 0
  },
  {
    "category_id": "1245",
    "category_name": "KU - CARTOON BADINI",
    "parent_id": 0
  },
  {
    "category_id": "82",
    "category_name": "KU - KURDISH MOVIES SUB",
    "parent_id": 0
  },
  {
    "category_id": "122",
    "category_name": "TR - SINEMA",
    "parent_id": 0
  },
  {
    "category_id": "116",
    "category_name": "TR - COCUK FILM",
    "parent_id": 0
  },
  {
    "category_id": "671",
    "category_name": "TR - ALT YAZI",
    "parent_id": 0
  },
  {
    "category_id": "770",
    "category_name": "TR - IMD FILMER",
    "parent_id": 0
  },
  {
    "category_id": "123",
    "category_name": "TR - YESIL CAM SINEMA",
    "parent_id": 0
  },
  {
    "category_id": "83",
    "category_name": "IR - PERSIAN SUB\/DUB",
    "parent_id": 0
  },
  {
    "category_id": "723",
    "category_name": "IR - PERSIAN کارتون",
    "parent_id": 0
  },
  {
    "category_id": "389",
    "category_name": "IR - PERSIAN MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "871",
    "category_name": "IR - PERSIAN کلاسیک دوبله",
    "parent_id": 0
  },
  {
    "category_id": "1009",
    "category_name": "IR - PERSIAN قدیمی",
    "parent_id": 0
  },
  {
    "category_id": "230",
    "category_name": "SO - SOMALIA MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "190",
    "category_name": "IN - TAMIL",
    "parent_id": 0
  },
  {
    "category_id": "1325",
    "category_name": "IN - KANNADA",
    "parent_id": 0
  },
  {
    "category_id": "88",
    "category_name": "IN - HINDI",
    "parent_id": 0
  },
  {
    "category_id": "222",
    "category_name": "IN - MALAYALAM",
    "parent_id": 0
  },
  {
    "category_id": "189",
    "category_name": "IN - PUNJABI",
    "parent_id": 0
  },
  {
    "category_id": "223",
    "category_name": "IN - KIDS",
    "parent_id": 0
  },
  {
    "category_id": "191",
    "category_name": "IN - TELUGU",
    "parent_id": 0
  },
  {
    "category_id": "270",
    "category_name": "IN - MARATHI",
    "parent_id": 0
  },
  {
    "category_id": "1166",
    "category_name": "PK - PAKISTANI MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "1169",
    "category_name": "PK - NAATS",
    "parent_id": 0
  },
  {
    "category_id": "1182",
    "category_name": "PK - KIDS",
    "parent_id": 0
  },
  {
    "category_id": "1168",
    "category_name": "PK -  NAATS NASHEED",
    "parent_id": 0
  },
  {
    "category_id": "276",
    "category_name": "BR - MOVIES",
    "parent_id": 0
  },
  {
    "category_id": "277",
    "category_name": "BR - KIDS",
    "parent_id": 0
  },
  {
    "category_id": "1045",
    "category_name": "CN - CHINA FILM",
    "parent_id": 0
  },
  {
    "category_id": "913",
    "category_name": "PH - PHILIPPINES FILM",
    "parent_id": 0
  }
]