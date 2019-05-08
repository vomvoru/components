import request from 'request';

const getHTML = async (id: string) =>
  new Promise<{ response: request.Response; body: any }>((resolve, reject) => {
    request(`https://comic.naver.com/webtoon/list.nhn?titleId=${id}`, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ response, body });
    });
  });

export default getHTML;
