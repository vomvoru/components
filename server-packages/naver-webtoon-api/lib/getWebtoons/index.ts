import cheerio from 'cheerio';
import getHTML from './getHTML';

type WebToon = {
  id: string;
  title: string;
};

const getTitle = ($: CheerioStatic, el: CheerioElement) =>
  $(el)
    .children('a')
    .attr('title');

const getId = ($: CheerioStatic, el: CheerioElement) => {
  const href = $(el)
    .children('a')
    .attr('href');

  const id = /titleId=([^&]+)/g.exec(href);

  return id ? id[1] : '';
};

const getWebtoons = async () => {
  const html = (await getHTML()).body;
  const $ = cheerio.load(html);

  const list: WebToon[] = [];

  $('.all_list.all_image>.section>ul>li').each((i, el) => {
    list.push({
      title: getTitle($, el),
      id: getId($, el),
    });
  });

  return list;
};

export default getWebtoons;
