# Depreciated: Please use react-feathersjs (https://www.npmjs.com/package/react-feathersjs)

# A Simple React Native Feathers Connector

This simple feathers connector should allow you to connect your component to
your feathers backend quickly and painlessly.

How to use:

```
const HelloWorld = ({ feathers }) => {
  console.log(feathers);
  return <Text>Hello World</Text>
}

connectFeathers(HelloWorld);
```

Make sure to wrap your app in a `<FeathersWrapper />` component at the highest
level.

If you look at your RN debugger, you should see a feathers object. That's it.
You can also pass in an endpoint option.

Help is always welcome and appreciated.
