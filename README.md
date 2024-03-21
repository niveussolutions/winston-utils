[![Npm package version](https://badgen.net/npm/v/@niveus/winston-utils)](https://www.npmjs.com/package/@niveus/winston-utils)
[![Npm package monthly downloads](https://badgen.net/npm/dm/@niveus/winston-utils)](https://www.npmjs.com/package/@niveus/winston-utils)
[![GitHub issues](https://badgen.net/github/issues/niveussolutions/winston-utils)](https://github.com/niveussolutions/winston-utils/issues/)
[![GitHub contributors](https://img.shields.io/github/contributors/niveussolutions/winston-utils.svg)](https://github.com/niveussolutions/winston-utils/graphs/contributors/)

# winston-utils
Utilities, helpers, formatters, transports for winston logger.


## Configs
Collection of log levels and colors. Currently supports the following ones.

* google
* RFC 3164

### How to use config
Example usage of config.

``` js
const { google } = require('@niveus/winston-utils').config;
const winston = require('winston');
const { combine, colorize, json } = winston.format;


const logger = winston.createLogger({
    level: 'debug',
    levels: google.levels,  // Log Levels
    format: combine(
        colorize({ all: true }),
        json(),
    ),
    transports: [new winston.transports.Console()],
});

winston.addColors(google.colors);  // Log Colors

module.exports = logger;

```

If this is not adding the colors, try removing the `colorize` formatter and add it to the transports like below

``` js
// ...

transports: [new winston.transports.Console({ format: winston.format.colorize({ all: true }) })],

// ...
```

### How To Use Logger

Each config adds its own custom log levels. Specific log levels can be called using it's corresponding method name. In the example below, it uses `google` config. Check the sevierity levels for the config used.

``` js
// uses google config
const logger = require('./path/to/logger');

logger.emerg('Emergency log', {custom: 'data'});
// LOG: { "level": "emerg", "message": "Emergency log", "custom": "data" }

logger.alert('Alert log', {custom: 'data'});
// LOG: { "level": "alert", "message": "Alert log", "custom": "data" }

```

#### Google Config
##### Log Levels

| Log Level |        Severity        | Description                      |
|:---------:|:----------------------:|----------------------------------|
|     0     | Emergency (`emerg`)    | System is unusable               |
|     1     | Alert (`alert`)        | Action must be taken immediately |
|     2     | Critical (`crit`)      | Critical conditions              |
|     3     | Error (`error`)        | Error conditions                 |
|     4     | Warning (`warn`)       | Warning conditions               |
|     5     | Notice (`notice`)      | Normal but significant condition |
|     6     | Informational (`info`) | Informational messages           |
| 7         | Debug (`debug`)        | Debug-level messages             |

##### Log Colors

|        Severity        | Color              |
|:----------------------:|--------------------|
| Emergency (`emerg`)    | bold white blackBG |
| Alert (`alert`)        | bold red yelloBG   |
| Critical (`crit`)      | bold white redBG   |
| Error (`error`)        | black redBG        |
| Warning (`warn`)       | black magentaBG    |
| Notice (`notice`)      | white blueBG       |
| Informational (`info`) | white greenBG      |
| Debug (`debug`)        | black yellowBG     |

<br>
<br>

#### RFC 3164 Config
##### Log Levels

| Log Level |        Severity        | Description                      |
|:---------:|:----------------------:|----------------------------------|
|     0     | Emergency (`emerg`)    | System is unusable               |
|     1     | Alert (`alert`)        | Action must be taken immediately |
|     2     | Critical (`crit`)      | Critical conditions              |
|     3     | Error (`error`)        | Error conditions                 |
|     4     | Warning (`warn`)       | Warning conditions               |
|     5     | Notice (`notice`)      | Normal but significant condition |
|     6     | Informational (`info`) | Informational messages           |
| 7         | Debug (`debug`)        | Debug-level messages             |

##### Log Colors

|        Severity        | Color              |
|:----------------------:|--------------------|
| Emergency (`emerg`)    | bold white blackBG |
| Alert (`alert`)        | bold red yelloBG   |
| Critical (`crit`)      | bold white redBG   |
| Error (`error`)        | black redBG        |
| Warning (`warn`)       | black magentaBG    |
| Notice (`notice`)      | white blueBG       |
| Informational (`info`) | white greenBG      |
| Debug (`debug`)        | black yellowBG     |


## Formatters
Collection of formatters. Currently supports the following ones.

* piiRedact

### How to use `piiRedact` formatter
`piiRedact` uses [`fast-redact`](https://www.npmjs.com/package/fast-redact) for redacting data. Kindly check the `fast-redact` documentation for more info.

> ⚠️ Use `structuredClone` or deep copy to log data in the log, or the redactor will mutate the data object.


Example code for using `piiRedact`.

``` js
// Logger file.

const { piiRedact } = require('@niveus/winston-utils').formatters;
const winston = require('winston');
const { combine, json } = winston.format;

// Configuration for the formatter.
const piiFormatterConfig = {
    paths: ['data.emailId'], // Or env based values, secrets manager, etc...
}

const piiRedactFormatter = formatters.piiRedact(piiFormatterConfig);

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        piiRedactFormatter,
        json(),
    ),
    transports: [new winston.transports.Console()],
});

module.expoers = logger;



// .... Somewhere else in the repository

const logger = require('./path/to/logger');

function resetPassword(data) {
    // data = {emailId: 'user@example.com'}
    logger.debug('user password reset', {data: structuredClone(data) });

    // LOG: { "level": "debug", "message": "user password reset", "data": { "emailId": "[REDACTED]" }}

    // ... rest of the code
}
```

#### piiRedact Config
Configuration for piiRedact formatter

Example

``` js
// Default value
const config = {
    paths = [],
    censor = '[REDACTED]',
};
```
| Config Name | Type   | Description                                                                                                                           |
|:-----------:|--------|---------------------------------------------------------------------------------------------------------------------------------------|
| paths       | Array  | Object paths to be redacted. Refer [path - Array](https://github.com/davidmarkclements/fast-redact/blob/main/readme.md#paths--array ) |
| censor      | String | The value to be replaced after redacting. Default is `[REDACTED]`.                                                                    |


