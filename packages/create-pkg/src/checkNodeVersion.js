/**
 * 최소 노드 버전을 체크하고 버전에 맞지 않으면 에러를 던지는 함수
 *
 * @param {number} nodeMinVersion node 최소 지원 버전
 * @param {string} processVersion process.version이 기본값으로 들어가는 테스트 코드 작성을 위한 파라미터
 */
const checkNodeVersion = (nodeMinVersion, processVersion = process.version) => {
  const nodeVersion = Number(processVersion.match(/^v(\d+\.\d+)/)[1]);

  if (nodeVersion < nodeMinVersion) {
    throw new Error(`node 버전 ${nodeMinVersion} 이상만 지원합니다.`);
  }
};

module.exports = checkNodeVersion;
