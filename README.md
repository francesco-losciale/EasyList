### This todo list project showcases:

- Usage of react-native to build ios and Android apps 
- Use mobx-state-tree for state management
- How to test views individually with reactnative testing library
- How to test user journeys using detox for e2e tests

#### What's next:

- Improve UX
- Send data to the backend
- Copy link to a list and share it

#### Prerequisites:

- Set up your development environment https://reactnative.dev/docs/environment-setup

### How to run:

- `npm run ios` or `npm run android`

E2E tests (ios): 

- `detox build --configuration ios.sim.debug`
- `detox test --configuration ios.sim.debug`

### Release on your physical device

- Follow this guide https://reactnative.dev/docs/signed-apk-android
- `npm run android -- --mode="release"`
