import request from 'request';

const getHTML = async () =>
  new Promise<{ response: request.Response; body: any }>((resolve, reject) => {
    request('https://comic.naver.com/webtoon/creation.nhn', (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ response, body });
    });
  });

export default getHTML;
