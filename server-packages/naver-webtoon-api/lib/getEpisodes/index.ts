import cheerio from 'cheerio';
import getHTML from './getHTML';

const getEpisodeNum = ($: CheerioStatic) => {
  const href = $($('#content>.viewList>tbody>tr .title>a')[0]).attr('href');

  const episodeNum = /no=([^&]+)/g.exec(href);

  return episodeNum ? parseInt(episodeNum[1], 10) : 0;
};
const getTitle = ($: CheerioStatic) => {
  const title = $($('#content>.viewList>tbody>tr .title')[0]).text();

  return title.trim();
};
const getDate = ($: CheerioStatic) => {
  const date = $($('#content>.viewList>tbody>tr .num')[0]).text();

  return new Date(date).getTime();
};

const getWebtoons = async (id: string) => {
  const html = (await getHTML(id)).body;
  const $ = cheerio.load(html);

  const episodeNum = getEpisodeNum($);
  const title = getTitle($);
  const date = getDate($);

  return { episodeNum, title, date };
};

export default getWebtoons;
