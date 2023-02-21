 


> Open this page at [https://lgrachov.github.io/shootmodule/](https://lgrachov.github.io/shootmodule/)

## Usage

### Normal Shoot

```ts
namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
 let enemy: Sprite;
let shootCursor: Sprite;
function shootCursor_render() {
shootCursor = sprites.create(img`
    1 . . . . . . . . . . . . . . 1
    . 1 . . . . . . . . . . . . 1 .
    . . 1 . . . . . . . . . . 1 . .
    . . . 1 . . . . . . . . 1 . . .
    . . . . 1 . . . . . . 1 . . . .
    . . . . . 1 . . . . 1 . . . . .
    . . . . . . 1 1 1 1 . . . . . .
    . . . . . . 1 . . 1 . . . . . .
    . . . . . . 1 . . 1 . . . . . .
    . . . . . . 1 1 1 1 . . . . . .
    . . . . . 1 . . . . 1 . . . . .
    . . . . 1 . . . . . . 1 . . . .
    . . . 1 . . . . . . . . 1 . . .
    . . 1 . . . . . . . . . . 1 . .
    . 1 . . . . . . . . . . . . 1 .
    1 . . . . . . . . . . . . . . 1
`, SpriteKind.Cursor)
controller.moveSprite(shootCursor)
}

function shootCursor_respawn() {
    shootCursor = sprites.create(img`
        1 . . . . . . . . . . . . . . 1
        . 1 . . . . . . . . . . . . 1 .
        . . 1 . . . . . . . . . . 1 . .
        . . . 1 . . . . . . . . 1 . . .
        . . . . 1 . . . . . . 1 . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . . . 1 1 1 1 . . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . . 1 1 1 1 . . . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . 1 . . . . . . 1 . . . .
        . . . 1 . . . . . . . . 1 . . .
        . . 1 . . . . . . . . . . 1 . .
        . 1 . . . . . . . . . . . . 1 .
        1 . . . . . . . . . . . . . . 1
    `, SpriteKind.Cursor)
    controller.moveSprite(shootCursor)
    shootCursor.setPosition(randint(10, 110), 60)
}

function spawnEnemy() {
    enemy = sprites.create(img`
     ........................
     ......ffff..............
     ....fff22fff............
     ...fff2222fff...........
     ..fffeeeeeefff..........
     ..ffe222222eef..........
     ..fe2ffffff2ef..........
     ..ffffeeeeffff..........
     .ffefbf44fbfeff.........
     .fee41fddf14eef.........
     fdfeeddddd4eff..........
     fbffee444edd4e..........
     fbf4f2222edde...........
     fcf.f22cccee............
     .ff.f44cdc4f............
     ....fffddcff............
     .....fddcff.............
     ....cddc................
     ....cdc.................
     ....cc..................
     ........................
     ........................
     ........................
     ........................
 `, SpriteKind.Enemy);
    enemy.setPosition(randint(10, 110), 60);
}

spawnEnemy();

shootCursor_render()

controller.moveSprite(shootCursor)
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if (shootCursor.overlapsWith(enemy)) {
    sprites.destroy(enemy, effects.fire, 10);
    sprites.destroy(shootCursor)
    shootCursor_respawn()
    }
});
```

https://user-images.githubusercontent.com/78234184/220450882-98a03369-e5c2-46b4-a7e2-5253b430e4c5.mp4

### Rotating Shoot

```ts
namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shootCursor.overlapsWith(enemy)) {
        sprites.destroy(enemy, effects.fire, 10)
        animation.runImageAnimation(
        shootCursor,
        [img`
            1 . . . . . . . . . . . . . . 1 
            . 1 . . . . . . . . . . . . 1 . 
            . . 1 . . . . . . . . . . 1 . . 
            . . . 1 . . . . . . . . 1 . . . 
            . . . . 1 . . . . . . 1 . . . . 
            . . . . . 1 . . . . 1 . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . 1 . . . . 1 . . . . . 
            . . . . 1 . . . . . . 1 . . . . 
            . . . 1 . . . . . . . . 1 . . . 
            . . 1 . . . . . . . . . . 1 . . 
            . 1 . . . . . . . . . . . . 1 . 
            1 . . . . . . . . . . . . . . 1 
            `,img`
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            1 1 1 1 1 1 1 . 1 1 1 1 1 1 1 1 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `,img`
            1 . . . . . . . . . . . . . . 1 
            . 1 . . . . . . . . . . . . 1 . 
            . . 1 . . . . . . . . . . 1 . . 
            . . . 1 . . . . . . . . 1 . . . 
            . . . . 1 . . . . . . 1 . . . . 
            . . . . . 1 . . . . 1 . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . 1 . . . . 1 . . . . . 
            . . . . 1 . . . . . . 1 . . . . 
            . . . 1 . . . . . . . . 1 . . . 
            . . 1 . . . . . . . . . . 1 . . 
            . 1 . . . . . . . . . . . . 1 . 
            1 . . . . . . . . . . . . . . 1 
            `,img`
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            1 1 1 1 1 1 1 . 1 1 1 1 1 1 1 1 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `],
        500,
        false
        )
        pause(2000)
        sprites.destroy(shootCursor)
        shootCursor_respawn()
    }
})
function shootCursor_render () {
    shootCursor = sprites.create(img`
        1 . . . . . . . . . . . . . . 1 
        . 1 . . . . . . . . . . . . 1 . 
        . . 1 . . . . . . . . . . 1 . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . . . 1 . . . . . . 1 . . . . 
        . . . . . 1 . . . . 1 . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . . 1 . . 1 . . . . . . 
        . . . . . . 1 . . 1 . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . 1 . . . . 1 . . . . . 
        . . . . 1 . . . . . . 1 . . . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . 1 . . . . . . . . . . 1 . . 
        . 1 . . . . . . . . . . . . 1 . 
        1 . . . . . . . . . . . . . . 1 
        `, SpriteKind.Cursor)
    controller.moveSprite(shootCursor)
}
function spawnEnemy () {
    enemy = sprites.create(img`
        ........................
        ......ffff..............
        ....fff22fff............
        ...fff2222fff...........
        ..fffeeeeeefff..........
        ..ffe222222eef..........
        ..fe2ffffff2ef..........
        ..ffffeeeeffff..........
        .ffefbf44fbfeff.........
        .fee41fddf14eef.........
        fdfeeddddd4eff..........
        fbffee444edd4e..........
        fbf4f2222edde...........
        fcf.f22cccee............
        .ff.f44cdc4f............
        ....fffddcff............
        .....fddcff.............
        ....cddc................
        ....cdc.................
        ....cc..................
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    enemy.setPosition(randint(10, 110), 60)
}
function shootCursor_respawn () {
    shootCursor = sprites.create(img`
        1 . . . . . . . . . . . . . . 1 
        . 1 . . . . . . . . . . . . 1 . 
        . . 1 . . . . . . . . . . 1 . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . . . 1 . . . . . . 1 . . . . 
        . . . . . 1 . . . . 1 . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . . 1 . . 1 . . . . . . 
        . . . . . . 1 . . 1 . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . 1 . . . . 1 . . . . . 
        . . . . 1 . . . . . . 1 . . . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . 1 . . . . . . . . . . 1 . . 
        . 1 . . . . . . . . . . . . 1 . 
        1 . . . . . . . . . . . . . . 1 
        `, SpriteKind.Cursor)
    controller.moveSprite(shootCursor)
    shootCursor.setPosition(randint(10, 110), 60)
}
let enemy: Sprite;
let shootCursor: Sprite;
spawnEnemy()
shootCursor_render()
controller.moveSprite(shootCursor)
```

https://user-images.githubusercontent.com/78234184/220450984-2715353f-76ef-40ca-ba20-ded65daf6564.mp4

## ~~Use as Extension~~

~~This repository can be added as an **extension** in MakeCode.~~

~~* open [https://arcade.makecode.com/](https://arcade.makecode.com/)~~
~~* click on **New Project**~~
~~* click on **Extensions** under the gearwheel menu~~
~~* search for **https://github.com/lgrachov/shootmodule** and import~~

## Edit this project ![Build status badge](https://github.com/lgrachov/shootmodule/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/lgrachov/shootmodule** and click import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/lgrachov/shootmodule/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
