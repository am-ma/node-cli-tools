# github-issues

CSVを食わせるといい感じでissueを登録するCLIツール

## install

```sh
$ git clone {git url}
$ cd /path/to/github-issues
$ npm i
$ npm link
```

## usage

### config

`.env.example`をコピーしてご利用ください

```env
ACCESS_TOKEN={GitHub access token}
```

### command

```sh
$ github-issues /path/to/issues.csv organization-name repository-name
```
