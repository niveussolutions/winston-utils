const google = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warn: 4,
        notice: 5,
        info: 6,
        debug: 7,
    },
    colors: {
        emerg: 'bold white blackBg',
        alert: 'bold red yelloBg',
        crit: 'bold white redBg',
        error: 'black redBg',
        warn: 'black magentaBG',
        notice: 'white blueBG',
        info: 'white greenBG',
        debug: 'black yellowBG',
    }
}

const rfc3164 = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warn: 4,
        notice: 5,
        info: 6,
        debug: 7,
    },
    colors: {
        emerg: 'bold white blackBg',
        alert: 'bold red yelloBg',
        crit: 'bold white redBg',
        error: 'black redBg',
        warn: 'black magentaBG',
        notice: 'white blueBG',
        info: 'white greenBG',
        debug: 'black yellowBG',
    }
}

module.exports = {
    google,
    rfc3164
};