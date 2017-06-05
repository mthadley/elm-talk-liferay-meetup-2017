import React from 'react';
import {
  Appear,
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  List,
  ListItem,
  Link,
  Quote,
  S,
  Slide,
  Text,
  Table,
  TableRow,
  TableItem,
  TableHeaderItem
} from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';
import createTheme from 'spectacle/lib/themes/default';

// CSS
import 'normalize.css';
import 'spectacle/lib/themes/default/index.css';

const images = {
  elmLogo: require('../assets/elm-logo.svg'),
  jsLogo: require('../assets/babel-logo.svg'),
  tweet: require('../assets/tweet.png')
};

preloader(images);

const theme = createTheme({
  primary: '#60B5CC',
  secondary: 'white',
  tertiary: 'white',
  quartenary: '#34495E',
  js: '#F5DA55'
}, {
  primary: 'Oswald'
});

const B = props => <S textColor="quartenary" type="bold">{props.children}</S>;
const W = props => <S textColor="secondary" type="bold">{props.children}</S>;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck progress="bar" transition={['slide']} transitionDuration={250} theme={theme}>
        <Slide notes={`
          * Hello, who am I? Loop and Experience Cloud<br>
          * Source of Talk Idea<br>
          * Following Elm for a few years now<br>
          * Thinking about Elm when writing JS
        `}>
          <Layout>
            <Fit>
              <Image margin="0 0 80px 0" height="200px" width="200px" src={images.elmLogo} />
            </Fit>
            <Fill>
              <Heading size={1} bold>
                Elm. <B>Why it is so safe.</B> And how you can be too!
              </Heading>
            </Fill>
          </Layout>
        </Slide>

        <Slide bgColor="js" notes={`
          * We all know JS is hard, why?
        `}>
            <Image textAlign="left" margin="0 0 80px 0" height="100px" with="100px" src={images.jsLogo} />

            <List>
                <ListItem>Dynamic</ListItem>
                <ListItem>Interpreted</ListItem>
                <ListItem>Multi-Paradigm</ListItem>
                <ListItem>Quirky (think <Code>==</Code> and <Code>===</Code>)</ListItem>
            </List>
        </Slide>

        <Slide notes={`
          * Delightful language<br>
          * Compiler error messages, Rust
        `}>
          <Layout>
            <Fit>
              <Image margin="0 80px 0 0" height="200px" width="200px" src={images.elmLogo} />
            </Fit>
            <Fill>
              <Heading textAlign="left" margin="0 0 80px 0">Elm</Heading>
            </Fill>
          </Layout>

          <List>
              <ListItem>Statically Typed</ListItem>
              <ListItem>Compiled (currently targets javascript)</ListItem>
              <ListItem>(Purely) Functional</ListItem>
          </List>
        </Slide>

        <Slide bgColor="secondary" fgColor="primary" notes={`
          * Why look to Elm for inspiration?<br>
          * NoRedInk big user, Employs the Language Creator<br>
          * Richard Feldman, software engineer<br>
          * They still get exceptions, but it's always the JS
        `}>
          <Heading margin="0 0 120px 0" size="1" textColor="primary">Elm In Production: <S type="bold" textColor="quartenary">NoRedInk</S></Heading>
          <Image src={images.tweet} />
        </Slide>

        <Slide notes={`
          * What are we going to talk about?
        `}>
          <Heading textColor="quartenary">RoadMap</Heading>

          <List>
            <ListItem>Pure Functions, everywhere</ListItem>
            <ListItem>Immutability</ListItem>
            <ListItem>No <Code>null</Code> or <Code>undefined</Code></ListItem>
            <ListItem>Union Types (and Easy State Machines)</ListItem>
            <ListItem>The Elm Architecture</ListItem>
          </List>
        </Slide>

        <Slide notes={`
          * Not a real world example<br>
          * Imagine if this was impossible?<br>
          * Would never have to worry about you or others doing it.
        `}>
          <Heading margin="0 0 20px 0">Pure Functions</Heading>

          <Text>Elm only has data and functions, and all functions are pure.</Text>

          <Text margin="0 0 80px 0">The following code is <W>impossible to write in Elm:</W></Text>

          <CodePane margin="0 0 20px 0" lang="js" source={require('raw-loader!../assets/length_1.ejs')} />

          <Appear>
            <div>
              <CodePane margin="0 0 20px 0" lang="js" source={require('raw-loader!../assets/length_2.ejs')} />

              <Text textColor="secondary">Contrived, I know...</Text>
            </div>
          </Appear>
        </Slide>

        <Slide bgColor="quartenary" notes={`
          * Definition of Side Effect
        `}>
          <BlockQuote>
            <Quote caps>In computer science, a function or expression is said to have a side effect if it modifies some state outside its scope or has an observable interaction with its calling functions or the outside world besides returning a value.</Quote>
            <Cite>Wikipedia</Cite>
          </BlockQuote>
        </Slide>

        <Slide notes={`
          * Explain function<br>
          * The most we can do is return a string<br>
          * Just makes the weirdness even more obvious
        `}>
          <Heading margin="0 0 80px 0">Now in <B>Elm</B></Heading>

          <CodePane lang="haskell" source={require('raw-loader!../assets/length.elm')} />
        </Slide>

        <Slide notes={`
          * Press space and read<br>
          * Most of us already do this<br>
          * Sometimes it's the easiest way<br>
        `}>
          <Heading margin="0 0 80px 0">Avoid <B>Side Effects</B></Heading>

          <List>
            <Appear><ListItem>They hard to <B>reason</B> about</ListItem></Appear>
            <Appear><ListItem>Difficult to <B>test</B></ListItem></Appear>
            <Appear><ListItem>Try to <B>return</B> values</ListItem></Appear>
          </List>
        </Slide>

        <Slide notes={`
          * Let's talk about immutability<br>
          * Examples of mutation in javascript<br>
          * Last line is like Java, declare a thing and do stuff to it
        `}>
          <Heading margin="0 0 80px 0">Immutability</Heading>

          <Text margin="0 0 20px 0">Let's take a look at some more <W>impossible</W> code:</Text>

          <Appear>
            <CodePane lang="js" source={require('raw-loader!../assets/immutable.ejs')} />
          </Appear>
        </Slide>

        <Slide bgColor="quartenary" notes={`
          * Mutation and side effects are related
        `}>
          <BlockQuote>
            <Quote caps>Much of what makes application development difficult is tracking mutation and maintaining state.</Quote>
            <Cite>Immutable.js Authors</Cite>
          </BlockQuote>
        </Slide>

        <Slide fgColor="primary" bgColor="secondary" notes={`
          * Difference between List and Array<br>
          * We bind each value to a name<br>
          * Most of the time we don't need to do this<br>
          * Original arrays are unchanged.
        `}>
          <Text textColor="primary" margin="0 0 20px 0">Let's try that all again in <B>Elm</B>:</Text>

          <Appear>
            <CodePane lang="haskell" source={require('raw-loader!../assets/immutable.elm')} />
          </Appear>
        </Slide>

        <Slide fgColor="primary" bgColor="js" notes={`
          * We can do it in JS!<br>
          * In my head, I always consult these basic rules first<br>
          * Most of you are probably already using these<br>
          * Sticking to these will keep you safe from mutation bugs
        `}>
          <Heading fit margin="0 0 40px 0">Easy Immutable Arrays in <B>Javascript</B></Heading>

          <Table>
            <TableRow>
              <TableHeaderItem>Use Case</TableHeaderItem>
              <TableHeaderItem>Array Method</TableHeaderItem>
            </TableRow>
            <TableRow>
              <TableItem textSize="24px">Same items, but maybe some <B>removed</B>?</TableItem>
              <TableItem><Code>.filter</Code></TableItem>
            </TableRow>
            <TableRow>
              <TableItem textSize="24px">Same number of items, but each one <B>transformed</B>?</TableItem>
              <TableItem><Code>.map</Code></TableItem>
            </TableRow>
            <TableRow>
              <TableItem textSize="24px">Need a <B>boolean</B>?</TableItem>
              <TableItem><Code>.some</Code>, <Code>.every</Code></TableItem>
            </TableRow>
            <TableRow>
              <TableItem textSize="24px">Some <B>other Type</B>?</TableItem>
              <TableItem><Code>.reduce</Code></TableItem>
            </TableRow>
            <TableRow>
              <TableItem textSize="24px"><B>Joining</B> arrays?</TableItem>
              <TableItem><Code>.concat</Code>, or <Code>[...]</Code></TableItem>
            </TableRow>
          </Table>
        </Slide>

        <Slide fgColor="primary" bgColor="js" notes={`
          * forEach should only be used for side effects, ex. console.log<br>
          * Sometimes they make sense
        `}>
          <Text textColor="secondary">Avoid methods like <Code >.forEach</Code> or <Code>.push</Code> when a more <B>functional</B> alternative is possible.</Text>
        </Slide>

        <Slide fgColor="primary" bgColor="js" notes={`
          * These two are actually very similar<br>
          * Object spread not included in ES2015<br>
          * Object.assign also works
        `}>
          <Heading fit margin="0 0 40px 0">What about "plain", immutable <B>objects</B>?</Heading>

          <Text margin="0 0 40px 0"><Code>{"{ user | name = \"Foo\" }"}</Code></Text>
          <Text><Code>{"{...user, name: 'Foo'}"}</Code></Text>
        </Slide>

        <Slide fgColor="primary" bgColor="js" notes={`
          * Or you can use Immutable.js<br>
          * We use it on Loop, no complaints<br>
          * Enables performance optimizations in React or Metal applications.<br>
          * One downside, keeping track of where you have plain objects and immutable objects<br>
          * Imagine if it was just apart of the language?<br>
          * Questions about Immutability?
        `}>
          <Heading fit margin="0 0 40px 0">Or try <B>Immutable.js</B></Heading>
        </Slide>

        <Slide bgColor="quartenary" notes={`
          * Can anyone guess what this is referring to?<br>
          * Tony Hare the addition of null references to ALGOL in 1965
        `}>
          <BlockQuote>
            <Quote caps>I call it my billion-dollar <W>mistake</W>.</Quote>
            <Cite>Tony Hoare</Cite>
          </BlockQuote>
        </Slide>

        <Slide notes={`
          * Seems like a basic function, explain it<br>
          * How could anything go wrong?<br>
          * I'm sure some people can already spot the problem<br>
          * This is impossible in Elm, let's prove it
        `}>
          <Heading margin="0 0 80px 0"><B>null</B> and <B>undefined</B></Heading>

          <CodePane margin="0 0 20px 0" lang="js" source={require('raw-loader!../assets/def-getUserName.ejs')} />

          <Appear>
            <div>
              <CodePane margin="0 0 20px 0" lang="js" source={require('raw-loader!../assets/getUserName.ejs')} />

              <Text textColor="secondary">Another example of <B>impossible Elm</B> code.</Text>
            </div>
          </Appear>
        </Slide>

        <Slide notes={`
          * Quick explanation of type alias and records<br>
          * Quick explanation of function type annotation<br>
          * Find function works exactly the same as JS version
        `}>
          <Heading fit margin="0 0 80px 0">Let's try to write it in <B>Elm</B>:</Heading>

          <CodePane margin="0 0 20px 0" lang="haskell" source={require('raw-loader!../assets/getUserName-broken.elm')} />
        </Slide>

        <Slide notes={`
          * What happened?
        `}>
          <Heading fit margin="0 0 80px 0">Oh, it doesn't even <B>compile</B>?</Heading>

          <CodePane margin="0 0 20px 0" lang="" source={require('raw-loader!../assets/error.txt')} />

          <Text textColor="secondary">So, what is a <B>Maybe</B>?</Text>
        </Slide>

        <Slide notes={`
          * Quick explanation of type definition<br>
          * The <code>a</code> is just a generic. Can fill it in later with anything.
        `}>
          <Text textColor="secondary" margin="0 0 80px 0">Elm does not have the concept of <Code>null</Code> or <Code>undefined</Code>. Instead we use a <B>Union Type</B> called <Code>Maybe</Code></Text>

          <CodePane margin="0 0 80px 0" lang="haskell" source={require('raw-loader!../assets/maybe.elm')} />

          <Appear>
            <Text textColor="secondary">Let's go fix our <Code>getUserName</Code> function...</Text>
          </Appear>
        </Slide>

        <Slide notes={`
          * We have added a case statement<br>
          * Explain case statement and pattern matching<br>
          * Need to return a default string
        `}>
          <CodePane margin="0 0 80px 0" lang="haskell" source={require('raw-loader!../assets/getUserName.elm')} />

          <Text textColor="secondary">Now it works! We need to make sure that we always return a <B>string</B>, since we said we would in our <B>type annotation</B>.</Text>
        </Slide>

        <Slide notes={`
          * More compact, does the same thing<br>
          * As you get used to Elm, write functions like this
        `}>
          <Text margin="0 0 80px 0" textColor="secondary"><B>Elm</B> has ways to cut down on some of the <B>boilerplate...</B></Text>

          <CodePane lang="haskell" source={require('raw-loader!../assets/getUserName-shorter.elm')} />
        </Slide>

        <Slide notes={`
          * People are smart, but they make mistakes.<br>
          * Leave this kind of work to compiler.<br>
          * Imagine never having these errors again.
        `}>
          <Heading><B>Elm</B> never lets you forget to handle these cases. The <B>compiler</B> always has your back.</Heading>
        </Slide>

        <Slide fgColor="primary" bgColor="js" notes={`
          * Still not perfect<br>
          * My own experience with TS. It's good, but not as good as Elm.
        `}>
          <Heading fit margin="0 0 40px 0">How can I <B>enforce</B> checking in my <B>JavaScript</B>?</Heading>

          <Appear>
            <Text margin="0 0 40px 0" textColor="secondary"><B>You can't.</B> But there is help!</Text>
          </Appear>

          <Appear>
            <Text margin="0 0 40px 0" textColor="secondary">Both <B>Flow</B> and <B>Typescript</B> have strict null checking.</Text>
          </Appear>
        </Slide>

        <Slide notes={`
          * We've seen some Union Types already.<br>
          * Booleans are defined as union types in Elm.<br>
          * What is a state machine? It's a machine that is configured to be in one of many states.
        `}>
          <Heading margin="0 0 40px 0"><B>Union Types</B>, and simple <B>State Machines</B></Heading>
        </Slide>

        <Slide fgColor="primary" bgColor="js" notes={`
          * Explain each method and state key.<br>
          * This is a state machine with too many states<br>
          * It's possible for Loading to be True and User to not be null<br>
          * Hard to remember to reset all of these states during transitions
        `}>
          <Text margin="0 0 40px 0" textColor="secondary">Consider the following component:</Text>

          <CodePane textSize="10px" lang="jsx" source={require('raw-loader!../assets/UserContainer.ejs')} />
        </Slide>

        <Slide notes={`
          * Same problems<br>
          * At least we get better type checking...
        `}>
          <Heading fit margin="0 0 40px 0">Let's do a simple rewrite of the <B>state</B> in <B>Elm</B>:</Heading>

          <CodePane margin="0 0 40px 0" lang="haskell" source={require('raw-loader!../assets/UserBasic.elm')} />

          <Appear>
            <Text textColor="secondary">But this has the same <B>downsides...</B></Text>
          </Appear>
        </Slide>

        <Slide notes={`
          * Explain each type constructor.<br>
          * Another generic. We can re-use this.<br>
          * We could add or remove states as we see fit.
        `}>
          <Heading fit margin="0 0 40px 0">But we can do better using Elm's <B>type</B> system.</Heading>

          <CodePane margin="0 0 40px 0" lang="haskell" source={require('raw-loader!../assets/RequestData.elm')} />

        </Slide>

        <Slide notes={`
          * Explain new model<br>
          * Explain view function<br>
          * Html is just plain functions like everything else<br>
          * What's different? Only three, mutually exclusive states are possible.
        `}>
          <Heading fit margin="0 0 40px 0">Now we can simplify our <B>Model</B>:</Heading>

          <CodePane margin="0 0 40px 0" lang="haskell" source={require('raw-loader!../assets/RequestDataView.elm')} />

            <Text margin="0 0 20px 0"textColor="secondary">Now all of our states are mutually exclusive.</Text>

          <Appear>
            <Text margin="0 0 20px 0"textColor="secondary">What happens if we forget to handle one of these cases?</Text>
          </Appear>
        </Slide>

        <Slide notes={`
          * Never forget to handle your errors again.<br>
          * Questions about Union Types?
        `}>
          <CodePane source={require('raw-loader!../assets/missing_patterns.txt')} />
        </Slide>

        <Slide notes={`
          * A natural pattern they noticed
        `}>
          <Heading fit margin="0 0 40px 0">The <B>Elm</B> Architecture</Heading>
        </Slide>

        <Slide notes={`
          * Explain code<br>
          * Just write these three and magic happens<br>
          * Concentrate on writing small functions
        `}>
          <Text margin="0 0 20px 0"textColor="secondary">Most <B>Elm</B> programs follow a similar architecture that centers on a few important <B>functions</B> and <B>types</B>:</Text>

          <CodePane lang="haskell" source={require('raw-loader!../assets/TEA.elm')} />
        </Slide>

        <Slide notes={`
          * This is a Basic counter<br>
          * Explain each line<br>
          * Notice messages are just another union type
        `}>
          <CodePane lang="haskell" source={require('raw-loader!../assets/TEA_parts.elm')} />
        </Slide>

        <Slide notes={`
          * Can anyone guess a popular javascript framework? Starts with an R? Not react...
        `}>
          <Heading>This pattern may look <B>familiar...</B></Heading>
        </Slide>

        <Slide bgColor="quartenary" notes={`
          * One of the authors describe redux as a port of the elm architecture to js
        `}>
          <BlockQuote>
            <Quote caps><W>Redux</W> evolves the ideas of <W>Flux</W>, but avoids its complexity by taking cues from <W>Elm</W>.</Quote>
            <Cite>Redux Authors</Cite>
          </BlockQuote>
        </Slide>

        <Slide notes={`
          * Let's see how they line up (Explain each)<br>
          * Some of your JS app uses redux for state management<br>
          * Some state lives in components<br>
          * In Elm, everything follows this pattern, fractal
        `}>
          <Table>
            <TableRow>
              <TableHeaderItem><B>Elm</B></TableHeaderItem>
              <TableHeaderItem><B>Redux</B></TableHeaderItem>
            </TableRow>
            <TableRow>
              <TableItem>Model</TableItem>
              <TableItem>State</TableItem>
            </TableRow>
            <TableRow>
              <TableItem>Msg</TableItem>
              <TableItem>Action</TableItem>
            </TableRow>
            <TableRow>
              <TableItem>Update</TableItem>
              <TableItem>Reducer</TableItem>
            </TableRow>
          </Table>
        </Slide>

        <Slide notes={`
          * Walk through of video
          * Any questions on TEA?
        `}>
          <Text margin="0 0 20px 0"textColor="secondary">This architecture enables state of the art <B>debugging</B>:</Text>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/oNogm31F2mo" frameborder="0" allowfullscreen></iframe>
        </Slide>

        <Slide notes={`
          * Hopefully this inspired you to think outside the box?<br>
          * What can I learn from other languages?
        `}>
          <Heading>Wrapping Up</Heading>
        </Slide>

        <Slide notes={`
          * Explain each link
        `}>
          <Text margin="0 0 40px 0" textColor="secondary">Cool Resources</Text>

          <List>
            <ListItem><Link href="https://www.youtube.com/watch?v=oYk8CKH7OhE">Let's be mainstream</Link></ListItem>
            <ListItem><Link href="http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html">How Elm slays a UI Antipattern</Link></ListItem>
            <ListItem><Link href="https://www.youtube.com/watch?v=IcgmSRJHu_8">Making impossible states impossible</Link></ListItem>
          </List>
        </Slide>

        <Slide notes={`
          * Almost Done! Question time!
        `}>
          <Heading>Questions</Heading>
        </Slide>
      </Deck>
    );
  }
}
