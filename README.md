# Ray.JS

`ray.js` is a library that checks the DOM for html components and execute its related js counterpart

![alt tag](https://raw.githubusercontent.com/Latostadora/rayjs/master/logo/rayjs.jpg)

## Table of contents

1. [Installation](#installation)
2. [An overview](#an-overview)
3. [Errors](#errors)
4. [Commands](#commands)
5. [More examples](#more-examples)

## Installation

Just download [ray.js](https://raw.githubusercontent.com/Latostadora/rayjs/master/dist/ray.js) and load it in your page

or use this:

```<script type="text/javascript" src="https://raw.githubusercontent.com/Latostadora/rayjs/master/dist/ray-min.js"></script>```

then, when your are ready to start looking for components, execute this:

```
<script type="text/javascript">
    new Ray().begin();
</script>
```

## An overview

When de DOM is ready `Ray.js` checks the DOM for elements with the `data-ray-component` attribute and executes the js that indicates the value of this attribute (Example 1).
You can add `data-ray-params` attribute with value on JSON format (Example 2).

Example:

Let's suppose we have this html (note the `data-ray-component` attribute)

```
    <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
```

the JS part of this component changes the src when it's executed:

```
    window.ChangeImageSrcComponent=function(data) {
        var image=data.DOMElement;
        image.setAttribute("src","images/test2.jpg");
    };
```

For a more complex example check the [samples directory](https://github.com/Latostadora/rayjs/tree/master/Samples)

## Data object

On every execution an component ```ray.js``` injects a data object containing 3 properties:

* DOMElement: a reference to the DOMElement that triggers the execution of the component
* bus: a reference to an EventBus
* params: a reference to params added in DOM Element like `data-ray-params` in JSON

## Bus

The ```ray.js``` bus has two methods:

* ```trigger(eventName, eventPayload)``` triggers an event with the corresponding payload
* ```on(eventName, callbackFn)``` listen to an event an sets the callback function to be called when the event happens

## ```data-ray-params``` attribute

The `data-ray-params` attribute allows to inject JSON formatted params (it must be valid JSON or it will fail)

Let's suppose we have this html (note the `data-ray-params` attribute)

```
    <img data-ray-component="ChangeImageSrcComponent" data-ray-params='{"srcImage":"images/test2.jpg"}' src="images/test1.jpg">
```

the JS part of this component receives the ```params``` property on the ```data``` object:

```
    window.ChangeImageSrcComponent=function(data) {
        var image = data.DOMElement;
        var src = data.params.srcImage;
        image.setAttribute("src",src);
    };
```

## Errors

```ray.js``` throws an Ray.Events.ERROR event on the EventBus if it detects an Error with the Exception as the payload. You can catch the error with this sample code:

```
    ray.bus.on(Ray.Events.ERROR, function(exception) {
        console.log("Error:"+exception.message);
    };
```

## Commands 

You can send a command to the ```ray.js``` bus to search & execute new components:

```
    ray.bus.trigger(Ray.Commands.EXECUTE_NEW_COMPONENTS);
```

## More examples

You can check more complex examples in the [samples directory](https://github.com/Latostadora/rayjs/tree/master/Samples)
