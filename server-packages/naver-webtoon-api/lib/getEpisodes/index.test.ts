import getEpisodes from './index';

describe('샘플 자료를 이용하여 테스트한다.', () => {
  test('659934 웹툰은 202화이여야 한다. (완결웹툰)', async () => {
    const { episodeNum, title, date } = await getEpisodes('659934');

    expect(episodeNum).toEqual(202);
    expect(title).toEqual('후기');
    expect(date).toEqual(new Date('2017.07.11').getTime());
  });

  test('686312 웹툰은 128화 이상이여야 한다.', async () => {
    const { episodeNum } = await getEpisodes('686312');

    expect(episodeNum).toEqual(128);
  });

  test('725831 웹툰은 3화 이상이여야 한다.', async () => {
    const { episodeNum } = await getEpisodes('725831');

    expect(episodeNum).toEqual(3);
  });

  test('721456 웹툰은 39화 이상이여야 한다.', async () => {
    const { episodeNum } = await getEpisodes('721456');

    expect(episodeNum).toEqual(39);
  });
});
