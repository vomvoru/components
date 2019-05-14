const checkNodeVersion = require('./checkNodeVersion');

describe('노드 버전 체크', () => {
  test('최소 버전 이상 체크', () => {
    expect(checkNodeVersion(8, 'v8.9.1')).toMatchInlineSnapshot(`undefined`);
    expect(checkNodeVersion(8, 'v9.9.1-beta.0')).toMatchInlineSnapshot(`undefined`);
    expect(checkNodeVersion(8, 'v9.9.1')).toMatchInlineSnapshot(`undefined`);
    expect(checkNodeVersion(8, 'v9.1')).toMatchInlineSnapshot(`undefined`);
  });

  test('최소 버전 미만 체크', () => {
    expect(() => checkNodeVersion(8, 'v7.9.1')).toThrowErrorMatchingInlineSnapshot(
      `"node 버전 8 이상만 지원합니다."`
    );
    expect(() => checkNodeVersion(8, 'v7.9.1-beta.0')).toThrowErrorMatchingInlineSnapshot(
      `"node 버전 8 이상만 지원합니다."`
    );
    expect(() => checkNodeVersion(8, 'v6.9.1')).toThrowErrorMatchingInlineSnapshot(
      `"node 버전 8 이상만 지원합니다."`
    );
    expect(() => checkNodeVersion(8, 'v6.1')).toThrowErrorMatchingInlineSnapshot(
      `"node 버전 8 이상만 지원합니다."`
    );
    expect(() => checkNodeVersion(8, 'v0.1.1')).toThrowErrorMatchingInlineSnapshot(
      `"node 버전 8 이상만 지원합니다."`
    );
    expect(() => checkNodeVersion(8, 'v0.1')).toThrowErrorMatchingInlineSnapshot(
      `"node 버전 8 이상만 지원합니다."`
    );
  });
});
