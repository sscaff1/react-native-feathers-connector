# A Simple React Native Feathers Connector
This simple feathers connector should allow you to connect your component to your feathers backend quickly and painlessly.

How to use:
```
const HelloWorld = ({ feathers }) => {
  console.log(feathers);
  return <Text>Hello World</Text>
}

connectFeathers(HelloWorld)
```

If you look at your RN debugger, you should see a feathers object. That's it. You can also pass in an endpoint option.
```
connectFeathers(HelloWorld, { endpoint: 'http://localhost:5000' }); 
```
The default endpoint is http://localhost:3000/

Future:
1. Create an NPM package.
2. Allow for additional options (loading screens).

Help is always welcome and appreciated.
