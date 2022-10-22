# docker コマンド

<!-- https://matsuand.github.io/docs.docker.jp.onthefly/engine/reference/run/ -->

- docker system prune -a
  - 使用されていない Container, Network, Image, Volume が削除されます(-a は--all でも同じ)
- docker-compose up -d
  - Docker image をバックグラウンドでビルド、イメージが見つからないときはビルドしてから動かす
- docker-compose build
  - Docker image をフォアグラウンドでビルド
- docker --help
  - docker コマンドの内容
- docker-compose build --no-cache
  - キャッシュを作成せずにビルド
- docker system df
  - 現在の Docker の容量利用状況を確認
- docker builder prune
  - 容量利用状況にある TYPE カラムの「Build Cache」削除
