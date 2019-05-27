# @vomvoru33/eslint-config-vomvoru
eslint config

## 기능
- javascript, typescript 지원
- prettier 적용
- jest 지원

## Usage
사용할 패키지 위치에서 아래 명령어들을 실행합니다.

**install**
```shell
$ npm install --save-dev @vomvoru33/eslint-config-vomvoru
# peerDependencies 설치
$ npx install-peerdeps --dev @vomvoru33/eslint-config-vomvoru --only-peers
```

**config**
eslint 설정파일에 `"extends": "@vomvoru33/eslint-config-vomvoru"` 를 추가합니다.

**vscode settings.json설정**
```json
{
  // eslint config
  "eslint.autoFixOnSave": true,
  // eslint 플러그인을 실행할 파일 설정
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {"language": "typescript", "autoFix": true },
    {"language": "typescriptreact", "autoFix": true }
  ]
}
```

**lint-staged 설정**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --ext .js --ext .jsx --ext .ts --ext .tsx --quiet --fix",
      "git add"
    ]
  }
}
```