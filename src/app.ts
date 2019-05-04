import $ from 'jquery'
import 'uikit/dist/js/uikit.min.js'
import './style/style.scss'
import Ractive from 'ractive'
class HomePage {
    reactiveDiv = $('<div>{{username}}</div>').html()
    ractive = new Ractive({
        target: '#handleme',
        template: this.reactiveDiv,
        data: {username: 'Jim Jones'}
    })
    constructor() {
        this.startScrollWatch()
        setTimeout(() => {
            this.ractive.set('username', 'Hey There Stephen')
        }, 2000)
    }

    startScrollWatch() {
        $(window).scroll((e) => {
            console.log($(window).scrollTop())
        })
    }
}

new HomePage()