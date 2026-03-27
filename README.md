# datastar-password-generator

A reactive single page password generator built using **Datastar and JavaScript**.

## Why DataStar?

Nowadays, wherever I go I see people using frameworks, even for a simple static application framework is used, people using frameworks named themself as "modern dev", they don't even aware that framework has dependencies, those dependencies has transitive dependencies, the chain grows, the people who claim themself as modern dev lacks in decision making, blindly trust the frameworks, but most of the problems can be solved without using frameworks. 

**the solution:** HTML for structuring the application, CSS for styling and JS for handling logical part of the application if required.

here comes **Datastar**, I choosed this library because it follows hypermedia approach and has lightweight setup without unwanted dependencies, this is what other frameworks promises, but **Datastar** does. By using datastar, application can build using HTML with **data-*** attributes.

## what's different from nayuki's password generator?

The goal is to generate password instantly when checkebox is checked. Thats what I've done here, by seeing below tabular colum you may understand real difference. Acheived the reactivity and state management without using framework, used DataStar, acheived the goal.

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

## Credits

This password generator is inspired by [Nayuki's random password generator](https://www.nayuki.io/res/random-password-generator-javascript/nayuki-password-generator.html) uses his JS logic for genearting passwords.
