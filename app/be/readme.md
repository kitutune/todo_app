ビルド

```zsh
./gradlew clean build --refresh-dependencies
```

起動

```zsh
java -jar build/libs/api-0.0.1-SNAPSHOT.jar
```

gradlew 整形

```zsh
./gradlew spotlessApply --refresh-dependencies
```
