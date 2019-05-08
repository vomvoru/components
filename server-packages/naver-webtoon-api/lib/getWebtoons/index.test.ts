import getWebtoonList from './index';

describe('웹툰 리스트를 가지고 오면.', () => {
  const MIN_LENGTH = 800;
  test(`가져온 웹툰 리스트 개수가 ${MIN_LENGTH}보다 크다.`, async () => {
    const webtoonList = await getWebtoonList();

    expect(webtoonList.length >= MIN_LENGTH).toBe(true);
  });

  test('가져온 웹툰 리스트는 모두 id와 title을 가지고 있다.', async () => {
    const webtoonList = await getWebtoonList();

    expect(
      webtoonList.every(
        ({ id, title }: { id: string; title: string }) =>
          typeof id === 'string' &&
          typeof title === 'string' &&
          id.trim() !== '' &&
          title.trim() !== '',
      ),
    ).toBe(true);
  });

  test('가져온 웹툰 리스트는 고유한 id를 가지고 있다.', async () => {
    const webtoonList = await getWebtoonList();

    expect(
      webtoonList.every(({ id }, index) =>
        webtoonList.every(({ id: otherId }, otherIndex) => id !== otherId || otherIndex === index),
      ),
    ).toBe(true);
  });

  test('가져온 웹툰 리스트와 샘플과 비교한다.', async () => {
    const webtoonList = await getWebtoonList();

    const sampleList = [
      { title: '가담항설', id: '670144' },
      { title: '가비지타임', id: '703844' },
      { title: '가우스전자 시즌1~2', id: '335885' },
      { title: '가우스전자 시즌3~4', id: '675554' },
      { title: '가족사진', id: '58293' },
      { title: '간 떨어지는 동거', id: '699415' },
      { title: '간질간질', id: '702165' },
      { title: '감염자', id: '675823' },
      { title: '갓 오브 하이스쿨', id: '318995' },
      { title: '갓핑크', id: '715159' },
    ];

    sampleList.forEach(smaple => {
      expect(
        webtoonList.some(webtoon => webtoon.title === smaple.title && webtoon.id === smaple.id),
      ).toBe(true);
    });
  });
});
