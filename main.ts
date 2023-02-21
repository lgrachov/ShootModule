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