# todo_app
- SpringBoot:v3.0.0
- JDK:17
- Next.js:v12
- React:v18
- mysql:v8



現状の状態で起動するには

- Docker Desktop:4.10.1 (82475)
- Docker:20.10.17
- Visual Studio Code:1.72.2 (Universal)
  - 拡張機能
    - Remote Development:v0.21.0
    - Docker:v1.22.2 
    - Dev Containers:v0.255.4
- zsh 5.8.1 (x86_64-apple-darwin21.0)

### Dockerのバージョンが20以降であればVscodeやシェルは特に問題ないと思われる

## 手順1 Docker Desktopを起動

## 手順2 リポジトリのクローン

~~~ shell
git clone git@github.com:kitutune/todo_app.git
~~~

## 手順3 Dockerでコンテナ起動

~~~zsh
cd todo_app/docker 
docker-compose build 
docker-compose up -d 
cd ..   
code .  //現在のディレクトリ位置でvscode起動
~~~

## 手順4 VScodeからコンテナに入る


1. Vscode左下の「リモートウインドウを開きます」押下
2. Open Folder in Containerを選択
3. app/beとapp/feの２つを開く（２つvscodeを立ち上げる必要がある）
4. どちらもコンテナの環境が出来上がるまで待つ

## be側

コンテナ内で
/app/src/main/java/com/smd/api/ApiApplication.javaを開いてrun java

## fe側
コンテナ内で
~~~shell
yarn
yarn dev
~~~

## 手順５
fe・be共に開発環境が立ち上がったら
http://localhost:3000/todo にアクセスするとtodoappが表示される

#### 参考
- https://github.com/gel1123/smd_api
- https://zenn.dev/nishiharu/articles/7f27b8c580f896
