## Custom Element in Javascript : Skeleton Element for preloading effect.

You can define two global variables in css : first for the color of background called `skeleton` and the second for the olor of the animation called `skeleton-wave`. By default  
`skeleton=#0000001C` and `skeleton-wave=rgba(0, 0, 0, 0.4)`.

You can use it as : 

```js
import SkeletonBox from './app.js';

customElements.define('skeleton-box', SkeletonBox);

const App = () => {
    return(
        <skeleton-box width="150" height="150"></skeleton-box>
        <skeleton-box width="150" height="150" rounded></skeleton-box>
        <skeleton-box lines="3"></skeleton-box>
        <skeleton-box placeholder="Text To Animate"></skeleton-box>
    );
}
```

This code is from a tutorial of [Grafikart](https://grafikart.fr).
