# Metalsmith Native Lazy Loading

## What is Metalsmith?

It's a great static site generator that is often used to create HTML from Markdown and other markup languages.

More info: https://metalsmith.io/

## Why this plugin?

There are other plugins that adds lazy loading to images, but this one uses the simplest approach - browser native image lazy loading. From this:

```
<img src="img/my-image.jpg" alt="MyAlt" title="MyTitle">
```

To this:

```
<img loading="lazy" src="img/my-image.jpg" alt="MyAlt" title="MyTitle">
```

Check browser compability: https://caniuse.com/loading-lazy-attr

## How to install

```javascript
npm install --save-dev metalsmith-native-lazy-loading
```

## How to use

Add this to the top:

```javascript
var imageLazyLoading = require('metalsmith-native-lazy-loading');
```

You then use it like so;

```javascript
Metalsmith(__dirnam).use(
    imageLazyLoading({
        pattern: ['**/*.png', '**/*.jpg', '**/*.webp'],
    })
);
```

That's all there is to it.
