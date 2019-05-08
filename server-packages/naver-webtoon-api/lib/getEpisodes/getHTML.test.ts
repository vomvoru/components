import getHTML from './getHTML';

describe('웹툰 에피소드 목록을 가진 HTML 을 가져오면', () => {
  const promiseWebtoonListHTML = getHTML('721456');

  test('가져오기를 성공한다.', async () => {
    const { response } = await promiseWebtoonListHTML;
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });
});
