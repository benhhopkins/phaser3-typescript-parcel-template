import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import LoadScene from './scenes/loadScene'
import TitleScene from './scenes/titleScene'
import GameScene from './scenes/gameScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 480,
	height: 270,
	banner: {
		// hidePhaser: false,
		// text: 'white',
		background: ['#e54661', '#ffa644', '#998a2f', '#2c594f', '#002d40']
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 350 },
			debug: true
		}
	},
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 480,
		height: 480,
	},
	zoom: 3,
	render: {
		pixelArt: true
	},
	scene: [LoadScene,
		TitleScene,
		GameScene]
}

export default new Phaser.Game(config)
