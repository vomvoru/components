const { ncp } = require('ncp');

const copyDir = (source, destination) =>
  new Promise((resolve, reject) => {
    ncp(source, destination, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });

/**
 * 풀더를 복사 붙어넣기 하는 함수
 * @param {*} source 복사될 풀더 경로
 * @param {*} common 복사될 풀더 경로 (source보다 우선순위 낮음) (source와 같은 이름의 파일이 있으면 source가 우선됩니다)
 * @param {*} destination 불어 넣어질 풀더 경로
 */
const copyTemplate = async ({ source, common, destination }) => {
  // console.log('{ source, common, destination }', source, common, destination);
  await copyDir(common, destination);
  await copyDir(source, destination);
};

module.exports = copyTemplate;
