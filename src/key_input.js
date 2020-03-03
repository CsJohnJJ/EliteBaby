// eventlistener for key press and release, controlling the character

export default class KeyInput {
    constructor(player){

        document.addEventListtener("keydown", event => {
            switch(event.keyCode){
                case 37:
                    player.movePlayer("left");
                    break;
                case 38:
                    player.movePlayer("up");
                    break;
                case 39:
                    player.movePlayer("right");
                    break;
                // case 32: //spacebar = attack
                //     player.playerAttack();
                //     break 
            }
        })

        document.addEventListener("keyup", event =>{
            switch (event.keyCode){
                case 37:
                    player.movePlayer("none");
                    break;
                case 38:
                    player.movePlayer("gravity");
                    break;
                case 39:
                    player.movePlayer("none");
                    break;
                // case 32: //spacebar = attack
                //     player.playerAttack();
                //     break
            }
        })

    }
}