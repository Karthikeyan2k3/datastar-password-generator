# datastar-password-generator

A reactive single page password generator built using **Datastar and JavaScript**.

![datastar-password-generator demo](https://github.com/Karthikeyan2k3/datastar-password-generator/blob/main/.readme-assets/demo.gif)

## Why DataStar?

Nowadays, wherever I go I see people using frameworks, even for a simple static application framework is used, people using frameworks named themself as "modern dev", they don't even aware that framework has dependencies, those dependencies has transitive dependencies, the chain grows, the people who claim themself as modern dev lacks in decision making, blindly trust the frameworks, but most of the problems can be solved without using frameworks. 

**the solution:** HTML for structuring the application, CSS for styling and JS for handling logical part of the application if required.

here comes **Datastar**, I choosed this library because it follows hypermedia approach and has lightweight setup without unwanted dependencies, this is what other frameworks promises, but **Datastar** does. By using datastar, application can build using HTML with **data-*** attributes.

## what's different from nayuki's password generator?

The goal is to generate password instantly when checkbox is checked. Thats what I've done here, by seeing below tabular colum you may understand real difference. Achieved the reactivity and state management without using framework, used DataStar, acheived the goal.

|                     |                 nayuki's password generator                |                           datastar-password-generator                              |
| ------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **UI**              | Insert HTML elements using `document.getElementById` by JS | Separated UI logics handled using HTML and DataStar (`data-*`), JS does only logic |
| **State Handling**  | Managed using JS and DOM                                   | Managed using Datastar **signals**                                                 |
| **Reactivity**      | No reactivity, i.e, after checking checkbox, generate button should clicked for password generation | updates automatically when state changes, i.e, password generates instantly when the checkboxes are  checked(`data-computed` `data-effect`)|
| **Error handling**   | uses alert for showing errors                              | handled in UI, shows if the condition fails(`data-show`)                          |

## ascii flow diagram

```
+------------------------------------------------+                                                            
|  Inputs:                                       |                                                            
|     Checkboxes: numbers, uppercase, lowercase, |                                                            
|                 ascii, space                   |---------------------------------+                          
|     Checkbox & Input: custom field             |                                 | (handle error in UI,     
|     Radio Buttons: length, entropy             |                                 | show if these conditions 
+------------------------------------------------+                                 v are true)                
                      |                                         +-------------------------------------+       
                      |                                         |  Error:                             |       
                      |(captured using signals                  |     password length > 10000         |       
                      |and used for derivation)                 |     negative password length        |       
                      |                                         |     entropy checked && charset < 2  |       
                      v                                         +-------------------------------------+       
+------------------------------------------------+                                                            
|  data-computed:                                |                                                            
|           charset  = initCharSet()             |                                                            
|           wholelen = calcLength()              |                                                            
|           entropy  = calcEntropy()             |                                                            
+------------------------------------------------+                                                            
                      |                                                                                       
                      |(if everything is valid,                                                               
                      |password is generated)                                                                 
                      |                                                                                       
                      v                                                                                       
+------------------------------------------------+                                                            
|  data-effect:                                  |                                                            
|           generatePassword()                   |                                                            
+------------------------------------------------+                                                            
                      |                                                                                       
                      |(generated password will                                                               
                      |shown in UI)                                                                           
                      |                                                                                       
                      v                                                                                       
+------------------------------------------------+                                                            
|  Output:                                       |                                                            
|       password: V{r;c"4#:F                     |                                                            
|       strength of password is shown            |                                                            
+------------------------------------------------+                                                            

```

## Custom Datastar Bundle

This project uses a custom datastar bundle([datastar-pwgen.js](https://github.com/Karthikeyan2k3/datastar-password-generator/blob/main/vendor/datastar-pwgen.js)) instead of full library, Only the required `data-attributes` for the datastar password generator were included.

### Used Data Attributes

- `data-signals`
- `data-bind`
- `data-effect`
- `data-computed`
- `data-attr`
- `data-show`
- `data-on`
- `data-text`
- `data-copy`

The bundle is built using the below mentioned command mentioned in [Lllama's blog](https://lllama.github.io/posts/datastartips/):

```
npx esbuild --bundle src/bundles/datastar.ts \
            --outdir=../bundles/ \
            --minify --sourcemap \
            --target=es2023 \
            --format=esm \
            --define:ALIAS='""'
```

### Custom `data-copy` Attribute

This project includes a custom built `data-copy` attribute for copying the generated password to the clipboard. 

When the copy button is clicked, the password is copied to the clipboard and then the button text changes to `✔ Copied`. After 2 seconds, the button text changes back to its original text

Example:

```html
<p id="password">password</p>
<button data-copy="#password">Copy</button>
```

## Credits

This password generator is inspired by [Nayuki's random password generator](https://www.nayuki.io/res/random-password-generator-javascript/nayuki-password-generator.html) uses his JS logic for generating passwords.
