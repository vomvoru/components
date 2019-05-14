# @vomvoru/create-pkg
유틸용 패키지 템플릿을 만들어주는 CLI 도구

## Install
```shell
npm install @vomvoru/create-pkg
```

## Usage
```shell
# help
$ create-pkg -h #--help

# template 설정
$ create-pkg -n "패키지 이름"  -d "패키지 설명" -t ts
$ create-pkg -n "패키지 이름"  -d "패키지 설명" -t js
# 혹은 다음과 같이 사용 가능
$ create-pkg --name "패키지 이름"  --description "패키지 설명" --template ts
$ create-pkg --name "패키지 이름"  --description "패키지 설명" --template js

# 대화형 CLI 실행
$ create-pkg -i #--inquirer
```

**fe_javascript_util 저장소에서는 다음과 같이 실행하면 됩니다.**
```shell
$ cd fe_javascript_util
$ npm run create # create-pkg -i
```

## template
템플릿 풀더 및 파일에 대해서.

뒤에 `.hbs` 라는 확장자는 템플릿 복사 과정에서 삭제됩니다.

> `.hbs`라는 확장자를 붙인 이유
package.json이나 jest.config.js 등의 설정파일이 그대로 남아있게 되면, 
IDE에서 혹은 lerna에서 해석하려고 해서 에러가 나게 됩니다.

다음은 각 템플릿 풀더에 대한 설명입니다.
**js-util**
js용 템플릿.
**ts-util**
ts용 템플릿.
**common**
js와 ts 템플릿에 공통적인 파일.
js-util 혹은 ts-util에 이미 동일한 이름의 파일이 존재하면 무시됩니다.