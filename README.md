imageLightbox
=============

Touch friendly responsive popup. 

Taken directly from http://osvaldas.info/image-lightbox-responsive-touch-friendly.

## New features

### Custom image loader

It's possible to pass function which will load required images.
<br/>
Note: In this case ``preloadNext`` parameter will be ignored and all pre-loading behaviour will be up to you.
<br/>
After image is loaded, function should pass image's instance to ``success`` callback, this image will be injected to DOM.

```javascript

    $( selector ).imageLightbox(
    {
        imageLoader: function (params) {
            var image = $( '<img />'),
                success = params.success || function () {},
                failure = params.failure || function () {};

            image.attr('src', params.url).load(function () {
                success(image);
            }).error(function () {
                failure();
            });
        }
    });

```

### Cancellable events

All handlers are passed new argument - object with ``cancel`` property which allows to cancel action (if it's logically possible).
Just set ``cacnel`` true and action will be cancelled.

```javascript

    $( selector ).imageLightbox(
    {
        onStart: function (evt) {
            evt.cancel = true;
        }
    });

```

### New event

Added new ``onImgChange`` event which is fired every time before image changing.
Except event object also accept one or two additional arguments:
<br/>
``direction`` - change direction 'left' or 'right'.
<br/>
``index`` - specific image index. Passed only if ``switchImageLightbox`` was fired.
