# HTML

## What is HTML ?

HTML is a markup language used to structure content on web pages.
It defines elements like headings, paragraphs, and sections.
Browser parses it to build DOM.

## What is DOM ?

DOM is a tree-like representation of HTML in browser memory.
It allows JavaScript to access and modify page content dynamically.

## HTML vs DOM? ?

HTML is static markup written in file.
DOM is live runtime representation created by browser.
DOM can change dynamically using JavaScript.

## What is semantic HTML?

Semantic HTML uses meaningful tags like header, article, section.
It improves readability, SEO, and accessibility.

## Why do we use DOCTYPE?

DOCTYPE tells browser to use standard rendering mode.
It prevents quirks mode and ensures consistent behavior.

## Block vs Inline elements?

Block elements take full width and start on new line.
Inline elements take only required space and stay in line.

## id vs class?

id is unique per element, class is reusable.
id has higher specificity than class.

## What is iframe?

iframe is used to embed another webpage inside current page.
It creates an isolated browsing context.

## What are meta tags?

Meta tags provide metadata like charset, viewport, SEO info.
They are not visible but affect browser behavior.

## What is viewport meta tag?

It controls page layout on mobile devices.
It ensures responsive scaling.

## What is data-\* attribute?

data attributes store custom information in HTML elements.
They can be accessed in JavaScript using dataset.

## Difference between HTML4 and HTML5?

HTML5 introduced semantic tags, multimedia support, and APIs.
It simplified structure and improved browser capabilities.

## What is accessibility?

Accessibility ensures websites are usable for all users including disabled users.
HTML supports it through semantic tags and ARIA attributes.

## Why use alt attribute in images?

alt provides alternative text for images.
It improves accessibility and SEO.

## What is lazy loading?

Lazy loading delays loading of content until needed.
It improves performance and reduces initial load time.

## What is difference between div and span?

div is block-level container, span is inline container.
div is used for layout, span for inline styling.

## What is form in HTML?

Forms collect user input and send data to server.
They use input, textarea, button elements.

## What is HTML parsing?

Browser reads HTML and converts it into DOM tree.
This process happens sequentially.

## What is render tree?

Render tree is combination of DOM and CSSOM.
It is used for layout and painting.

## What is difference between script async and defer?

async loads script independently and executes immediately.
defer loads script but executes after HTML parsing.

## What is caching?

Caching stores resources in browser to reduce network calls.
It improves performance on repeat visits.

## What is SEO in HTML?

SEO improves website visibility in search engines.
HTML helps using semantic tags and meta information.

## What is difference between strong and b tag?

strong adds semantic importance, b is only visual bold.
strong is preferred for accessibility.

## What is canvas in HTML?

Canvas is used to draw graphics using JavaScript.
It provides pixel-level drawing control.

## What is SVG?

    SVG is vector-based graphics format in HTML.
    It scales without losing quality.

## What is HTML5 storage?

HTML5 provides localStorage and sessionStorage.
They store data in browser on client side.

## localStorage vs sessionStorage?

localStorage persists even after browser closes.
sessionStorage clears when session ends.

## What happens from HTML download to pixel rendering?

Browser parses HTML into DOM, combines it with CSSOM to form render tree, then performs layout and paint to display pixels on screen.

### Followups: What is layout vs paint? ,What is compositing?

## DOM vs CSSOM vs Render Tree?

DOM is structure from HTML, CSSOM is styles from CSS, and render tree is combination of both used for layout and painting.

### Followups : Can render tree exist without CSSOM? Why is JS not part of render tree?

## Why does script block HTML parsing?

Because script execution can modify DOM, browser pauses parsing to ensure correct execution order.

## async vs defer?

async executes script immediately after download, while defer waits until HTML parsing is complete before executing.

Followup : Which is better for performance?

## reflow vs repaint?

Reflow recalculates layout of elements, repaint only updates visual styles without layout change.

## What triggers reflow?

Changes in layout like width, height, DOM structure, or font size trigger reflow.

Followup : How to avoid reflow?

## Why is deep DOM bad?

Deep DOM increases traversal time and slows layout and rendering calculations.

Followup : What is optimal DOM size?

## What is accessibility tree?

Accessibility tree is a browser representation used by screen readers to interpret page content.
Followup : How ARIA affects it?

## Screen reader interpretation?

Screen readers use accessibility tree and semantic HTML to read content in logical order.

## Semantic HTML vs ARIA?

Semantic HTML provides native meaning, while ARIA adds extra accessibility information when semantics are insufficient.

## When should ARIA NOT be used?

ARIA should not be used when native HTML elements already provide correct semantics.
Followup: Example misuse cases?

## Multiple H1 tags?

Multiple H1 tags are allowed in HTML5 but should be used carefully to maintain document structure.

Followup : SEO Impact ?

## Malformed HTML handling?

Browsers automatically fix malformed HTML using error recovery algorithms.

## Why no errors for broken HTML?

Because browsers are designed to be backward compatible and tolerant to avoid breaking pages.

## Speculative parsing?

Browser preloads resources while parsing HTML to improve performance.

## how does preload scanner work?

It scans HTML ahead of parser to fetch resources like CSS and images early.

## HTML parsing vs JS execution?

HTML parsing builds DOM, while JS execution runs scripts and can modify DOM.

## Why DOM manipulation is expensive?

Because it can trigger reflow and repaint which are computationally costly.

Follow-ups: how to optimize DOM updates?

## Layout thrashing?

Layout thrashing happens when repeated DOM reads and writes force multiple reflows.

## Browser HTML optimization?

Browsers use incremental parsing, caching, and preload scanners to optimize HTML rendering.

## Critical rendering path?

It is the sequence from HTML parsing to rendering pixels including DOM, CSSOM, render tree, layout, and paint.

## Why CSS is render-blocking?

Because browser needs full CSSOM before rendering page to avoid incorrect styling.

Follow-ups: async CSS loading?

## Script placement importance?

Script placement affects rendering because scripts can block HTML parsing and DOM construction.

## Multiple CSS files behavior?

Browser merges all CSS files into CSSOM and applies cascading rules based on specificity and order.

Follow-ups: specificity rules?

## Inline CSS faster?

Inline CSS can reduce network requests but reduces maintainability and caching efficiency.

## CSR vs SSR?

CSR renders UI in browser using JavaScript, SSR renders HTML on server and sends ready page.

## Hydration?

Hydration is process of attaching JavaScript behavior to server-rendered HTML.

## Shadow DOM?

Shadow DOM provides encapsulated DOM and styles inside components.

## iframe isolation?

iframe creates separate browsing context with isolated DOM and execution environment.

## HTML security issues?

HTML can be vulnerable to XSS if user input is not sanitized before rendering.

## how to prevent XSS?

# CSS

## What is CSS?

CSS is a stylesheet language used to control the visual presentation of HTML elements like layout, colors, spacing, and responsiveness.
It is applied after DOM creation during rendering.

## What is CSSOM?

CSSOM is a tree structure created by the browser from CSS files.
It is combined with DOM to create the render tree.

## What happens when browser loads CSS?

Browser parses CSS into CSSOM, then combines it with DOM to create render tree used for layout and painting.

## Why is CSS render-blocking?

Because browser needs complete CSSOM before rendering to avoid incorrect layout or flash of unstyled content.

## How to optimize CSS loading?

## What is specificity in CSS?

Specificity is the rule that decides which CSS style is applied when multiple rules target the same element.

## Specificity hierarchy?

Inline styles > ID selectors > class selectors > element selectors. & What happens in tie cases?

## What is cascade in CSS?

Cascade is the process of resolving conflicts between multiple CSS rules based on specificity, importance, and order.

## What is box model?

Box model defines how elements are structured using content, padding, border, and margin.

## content-box vs border-box?

content-box includes only content in width/height, while border-box includes padding and border in total size.

Follow up : Which one is default?

## What is flexbox?

Flexbox is a layout system used to align and distribute space among items in a container.

## What is grid layout?

CSS Grid is a 2D layout system used to design rows and columns simultaneously.

## Flex vs Grid?

Flex is 1D layout (row or column), Grid is 2D layout (rows and columns together).

## position types?

CSS positions include static, relative, absolute, fixed, and sticky which control how elements are placed in layout.

## absolute vs relative?

relative positions element relative to itself, absolute positions relative to nearest positioned parent.
Follow up : what if no parent is positioned?

## z-index?

z-index controls stacking order of elements along z-axis.

## Why z-index not working?

z-index works only on positioned elements and within stacking contexts.

## What is stacking context?

Stacking context is a layer system that determines how elements are layered on screen.
Follow-ups: examples of stacking context creation?

## What is responsive design?

Responsive design ensures UI adapts to different screen sizes using media queries and flexible layouts.
Follow-ups: mobile-first vs desktop-first?

## media queries?

Media queries apply CSS rules based on device screen size or conditions.
Follow-ups: breakpoints strategy?

## rem vs em?

rem is relative to root font size, em is relative to parent element.
Follow Up : which is better for scaling?

## px vs rem?

px is fixed unit, rem is scalable based on root font size.
Follow-ups: accessibility impact?

## pseudo classes?

Pseudo classes define state-based styling like hover, focus, active.

## pseudo elements?

Pseudo elements style specific parts of an element like before and after content.

## what is inherit in CSS?

inherit forces a property to take value from parent element.
Follow up : which properties inherit by default?

## what is opacity vs visibility?

opacity hides element visually but still occupies space, visibility hides element but preserves layout.
Follow ups : display:none vs visibility:hidden?

## display none vs visibility hidden?

display none removes element from layout, visibility hidden hides it but keeps space.
Follow ups : performance difference?

## What is BEM?

BEM is CSS naming convention that improves maintainability using block, element, modifier structure.

Follow up : why BEM used in large apps?

## What is CSS specificity war problem?

It happens when multiple CSS rules override each other due to high specificity, making code hard to maintain.
Follow up : How to avoid it

## What is critical CSS?

Critical CSS is the minimal CSS required to render above-the-fold content quickly.
Follow up : how to implement it?
Follow up : CSS in component-based architecture?

# Javascript

## Q. What is prototypal inheritance

    Prototypal inheritance in JavaScript means objects can inherit properties and methods directly from other objects using a prototype chain.
    When I access a property, JavaScript first checks the object itself, and if not found, it moves up the prototype chain until it reaches `null`.
    Internally every object has a hidden link called `__proto__` which points to its parent object.

## Q. `__proto__` vs prototype

    \_`__proto__` is the internal reference that an object uses to look up properties from its parent.
    prototype is a property on constructor functions that is used to set the `__proto__` of objects created using new.
    prototype is for object creation,`__proto__` is for inheritance lookup.

## Q. How new works

    When we use new, JavaScript creates a new object, links it to the constructor’s prototype, executes the function with `this` pointing to that object, and finally returns it.

Short version : new creates an object and connects it to the constructor’s prototype chain.

## Q.call, apply, bind

Core Answer : These methods are used to control what `this`ß refers to inside a function.

**Call** : - call invokes a function immediately with a specific this and arguments passed one by one.

`fn.call(obj, a, b)`

**apply** is same as call, but arguments are passed as an array.

`fn.apply(obj, [a, b])`

**bind** does not execute the function immediately. It returns a new function with `this` permanently set.

`const newFn = fn.bind(obj)`

### Q. Why call/apply/bind exist

    They exist because JavaScript functions don’t have a fixed `this`.
    So these methods allow us to explicitly control the execution context.

## Q. Arrow function vs normal function

Arrow functions do not have their own `this` or `prototype`.
They inherit `this` from surrounding scope, which makes them useful for callbacks.

Simple version: Arrow functions are lexically bound, normal functions are dynamically bound.

## Q. Why prototype exists

Prototype exists to share methods between objects instead of creating copies for each object.
It improves memory efficiency and enables inheritance in JavaScript

## Q. If interviewer asks “Explain JS inheritance in simple terms”

JavaScript uses prototype-based inheritance where objects can inherit from other objects through a prototype chain.

When we access a property, JS first checks the object, then moves up the chain until it finds it or reaches null.

This is the base of how objects, arrays, and functions share behavior internally.

## Q. What is this in JavaScript?

    this is a keyword whose value depends on how a function is called.
    In normal functions, it is determined at runtime based on the call site. In arrow functions, it is lexically inherited from the surrounding scope.
    It is mainly used to refer to the current execution context.

## Q. Difference between arrow and normal functions?

    Normal functions have their own this, arguments, and can be used as constructors.
    Arrow functions inherit this and arguments from outer scope and cannot be used with new.
    Arrow functions are mainly used for callbacks and cleaner syntax.

## Q. What is closure?

    Closure is when a function remembers variables from its outer scope even after the outer function has executed.
    This happens because JavaScript keeps lexical scope alive through function references.
    It is used for data encapsulation and state preservation.

## Q. What is event loop?

    Event loop is a mechanism that handles asynchronous code execution in JavaScript.
    It continuously checks the call stack and callback queues and pushes tasks when the stack is empty.
    It enables non-blocking behavior in JS.

## Q.What is setTimeout and how does it work internally?

    setTimeout schedules a callback to be executed after a minimum delay.
    The callback is sent to the task queue and executed by the event loop once the call stack is free.
    It does not guarantee exact timing, only minimum delay.

## Q. What is promise?

    A Promise is an object representing the eventual completion or failure of an asynchronous operation.
    It has states: pending, fulfilled, and rejected.
    It helps avoid callback hell and improves async readability.

## Q. What is async/await?

    async/await is syntactic sugar over promises that makes asynchronous code look synchronous.
    await pauses execution inside async function until promise resolves.
    It improves readability and error handling.

## Q. What is call, apply, bind?

    These methods are used to control the value of this in a function.
    call and apply execute immediately with different argument styles, while bind returns a new function.
    They are used for explicit context binding.

## Q.What is hoisting?

    Hoisting is JavaScript’s behavior of moving declarations to the top of scope during compilation.
    Variables declared with var are hoisted with undefined, while let/const are in temporal dead zone.
    It explains why variables/functions can be used before declaration.

## Q.What is scope?

    Scope defines where variables are accessible in code.
    JavaScript has global, function, and block scope with lexical scoping rules.
    It controls variable visibility and lifetime.

## Q.What is event bubbling?

    Event bubbling is the process where events propagate from child element to parent elements.
    It allows parent elements to handle events from children using event delegation.
    It improves performance by reducing multiple listeners.

## Q.What is event delegation?

    Event delegation is a pattern where a parent handles events for its child elements.
    It works because of event bubbling in the DOM.
    It improves performance and dynamic element handling.

## Q. What is debouncing?

    Debouncing ensures a function is executed only after a delay once the event stops firing.
    It is used to reduce unnecessary function calls in frequent events like input or resize.
    It improves performance.

## Q. What is throttling?

    Throttling ensures a function is executed at most once in a specified time interval.
    It is used for continuous events like scroll.
    It controls execution rate.
