# Node-BBCode
### Simple and easy BBCode library
[![license](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/patrykcieszkowski/node-bbcode)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Z75DMS8AVZY5Y)

Node-BBCode is simple library for BBCode rendering, designed for Node.JS.

# Contents
  - [Installation](#installation-)
  - [Usage](#usage-)
  - [Options](#options-)
  - [Tags](#tags-)

# Installation [^](#installation)
  ```js
    $ npm install node-bbcode
  ```
# Usage [^](#usage)
First step is to `require` this package.
  ```js
    const BBCode = require('node-bbcode')
  ```
Now you can use `BBCode` as a namespace for the module. Node-BBCode contains one method, which takes two parameters; `content` and `options`.

### render(content, options)
  - `content` - BBCode string you want to render. This can be either whole text or single BBC tag.
  - `options` - An object containing your settings for current rendering process.

# Options [^](#options)
  - `classPrefix` - prefix class to be inserted on all rendered tags. (Default: 'bbcode'): String
  - `newLine` - whether or not to break line `<br>` on `\n` new line. (Default: false): Boolean
  - `allowData` - whether or not to allow custom `data-` tags on BBCode tag. (Default: false): Boolean
  - `allowClasses` - whether or not to allow custom classes on BBCode tag. (Default: false): Boolean

For more details about `data-*` and `class` tags, see ['tags' section](#tags).

# Tags [^](#tags)
List of tags supported by `Node-BBCode`
  - `quote` - renders to: `<div class="quote" data-author="ID" data-name="NAME">NAME wrote:<blockquote>TEXT</blockquote></div>`
    - `ID` - quoted post's author ID (Number) (Optional)
    - `NAME` - quoted post's author Name (String) (Optional)
  - `url` - renders to: `<a href="URL">TEXT</a>`
    - `URL` - destination link (String)
  - `email` - renders to: `<a href="mailto:EMAIL">TEXT</a>`
    - `EMAIL` - email address (String)
  - `b` - renders to: `<strong>TEXT</strong>`
  - `i` - renders to: `<em>TEXT</em>`
  - `u` - renders to: `<span style="text-decoration:underline">TEXT</span>`
  - `s` - renders to: `<span style="text-decoration:line-through">TEXT</span>`
  - `indent` - renders to: `<blockquote>TEXT</blockquote>`
  - `ul` and `list` - renders to: `<ul><li>item 1</li><li>item 2</li></ul>`
  - `ol` - renders to:  `<ol><li>item 1</li><li>item 2</li></ol>`
  - `code`, `php`, `java`, `javascript`, `cpp`, `ruby`, `python` - renders to: `<pre>CODE</pre>`
  - `highlight` - renders to: `<span style="background-color: COLOR">TEXT</span>`
    - `COLOR` - color (String)
  - `color` - renders to: `<span style="color: COLOR">TEXT</span>`
    - `COLOR` - color (String)
  - `span` - renders to: `<span>TEXT</span>`
  - `h1` - renders to: `<h1>TEXT</h1>`
  - `h2` - renders to: `<h2>TEXT</h2>`
  - `h3` - renders to: `<h3>TEXT</h3>`
  - `h4` - renders to: `<h4>TEXT</h4>`
  - `h5` - renders to: `<h5>TEXT</h5>`
  - `h6` - renders to: `<h6>TEXT</h6>`
  - `img` - renders to: `<img src="SRC" title="TITLE" alt="ALT" height="HEIGHT" width="WIDTH">`
    - `SRC` - source (String)
    - `TITLE` - title (String) (Optional)
    - `ALT` - alternative text (String) (Optional)
    - `HEIGHT` - height (Number) (Optional)
    - `WIDTH` - width (Number) (Optional)

All BBC tags support `class` and `data-*` attributes:
  - ```html
      [span class="large" data-id="1"]TEXT[/span]
    ```
  will end up as:
  - ```html
      <span class="large" data-id="1">TEXT</span>
    ```

BOTH ATTRIBUTES HAVE TO BE ALLOWED ON `options` OBJECT (see ['options' section](#options)).
