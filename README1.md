## Step 1: Start the Metro Server

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npx
npx react-native start

```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npx react-native run-android

```

### For iOS

```bash
# using npm
npx react-native run-ios

```
## Fresh build

```bash
cd android
./gradlew clean

```
## run metro bundler

```bash
npx react-native start
```

## debug assemble apk

```bash
npx react-native run-android
```

## release assemble apk

```bash
cd android
./gradlew assembleRelease

```

