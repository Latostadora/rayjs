# Ray.JS

`ray.js` is a library that checks the DOM for html components and execute its related js counterpart

![alt tag](https://raw.githubusercontent.com/josecgil/rayjs/master/logo/rayjs.jpg)

## Table of contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [An overview](#an-overview)
4. [More examples](#more-examples)

## Requirements

None

## Installation

Just download [ray.js](https://raw.githubusercontent.com/josecgil/rayjs/master/dist/ray.js)

or use this:

```<script type="text/javascript" src="https://raw.githubusercontent.com/josecgil/rayjs/master/dist/ray.js"></script>```

## An overview

When de DOM is ready `Ray.js` checks the DOM for elements with the `data-ray-component` attribute and executes the js that indicates the value of this attribute.

Example:

Let's suppose we have this html (note the `data-ray-component` attribute)

```
    <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
```

the JS part of this component changes the src when it's executed:

```
    window.ChangeImageSrcComponent=function(image) {
        image.setAttribute("src","images/test2.jpg");
    };
```

## More examples

You can check more complex examples in the [samples directory](https://github.com/josecgil/rayjs/tree/master/Samples)