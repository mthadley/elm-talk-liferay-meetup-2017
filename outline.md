# Javascript

What is it?

* Dynamic
* Interpreted
* Multi-Paradigm
* Quirky (think == vs ===)

# Elm

What is it?

* Statically Typed
* Compiled (currently targets javascript)
* (Purely) Functional

# Elm in Production

Elm is used extensively at NoRedInk. Makers of educational software.

Currently have over 100,000 lines of Elm code, and it has been in Production for
over 2 years. Zero run-time exceptions.

# Roadmap

* Pure Functions, everywhere
* Immutability
* No `Null` or `undefined`
* Union Types (Easy State Machines)
* Enforced Semantic Versioning

# Pure Functions

Elm only has data and functions, and all functions are pure.

Impossible to write in Elm:

```js
function length(items) {
  window.message = "Just measuring arrays over here...";
  return item.length;
}

const myGreeting = "Hello Everyone!";
window.message = myGreeting;

const items = [1, 2, 3];
assert.equal(length(items), 3); // Pass. Coo.

assert.equal(window.message, myGreeting) // Fail. Wait, why did my message change?
```

This is a simple side effect. I'm not saying someone will every write this, but
the point is that they CAN write it.

The Elm way:
```elm
length : List a -> (Int, String)
length items = (List.length items, "Just doing some measuring...")

items =
  [1, 2, 3]

Expect.equal (List.length items) (3, "Jest doing some measuring...")
-- What a strange function....
```

The most we can do in our strange length function is return the message. It
gives you confidence in your code, but you know the only way any function you
call did *anything*, was based on what it returned. No guessing.

In javascript, try to write pure functions, and be aware of how side effects can
make your code harder to understand.

Which leads us to...

# Immutability

All data in Elm is immutable. Let's see some more javascript that is impossible
in Elm.

```js
const numbers = [1, 2, 3];
numbers[1] = 26;
assert.deepEqual(numbers, [1, 26, 3]);

const user = {
  name: 'Foo'
};
user.name = 'Bar';
assert.equal(user.name, "Bar");

const newNumbers = [];
numbers.forEach(number => newNumbers.push(number * 2));
assert.deepEqual(numbers, [2, 52, 6]);
```

Why is this bad? Same issue as side effects.

"Much of what makes application development difficult is tracking mutation and maintaining state."

The elm way:
```elm
-- Lists and Arrays are different. We need Array if we want indexed access.
numbers = Array.fromList [1, 2, 3]
newNumbers = Array.set 1 26 numbers
Expect.equal newNumbers (Array.fromList [1, 2, 3])

user = {
  name = "Foo",
  age = 100
}
newUser = {user | name = "Bar"}
Expect.equal user.name "Bar"

-- There is no `forEach` equivalent
doubledNumbers = Array.map (\num -> num * 2) numbers
Expect.equal doubledNumbers (Array.fromList [2, 4, 6])
```

I'm creating a lot of intermediate values and naming like `newThing`. Normally,
I would just inline the values where I need them, but I want to make it obvious
that each of these functions returns a new value, and the old one has not been
mutated.

This is something that is actually not too hard to achieve in javascript. When
working with arrays, we have many of the same tools that we would find in Elm.
And all of them return a new array. Here is how I think about it:

Do I expect the same items, but maybe some removed? `Array.prototype.filter`
Same number of items, but each one is changed? `Array.prototype.map`
Some boolean based on the values in the array? `Array.prototype.some, Array.prototype.every`
The entire array will be used to create a different kind of value? `Array.prototype.reduce`
Join two arrays? `[...first, ...second] or first.concat(second)`

I usually try to avoid `forEach` (unless for explicit side effects), `push`,
`pop`, etc. Sometimes they make sense though.

Also, take a look a Immutable.js

# Null and Undefined

Consider this code (Once again, not possible to write in Elm):
```js
function getUserName(id, users) {
  return users.find(user => user.id === id).name;
}

/* And then later... */
console.log(
  getUserName(23, [
    {id: 1, name: 'Foo'},
    {id: 2, name: 'Bar'}
  ])
);
// 😢 Oh, no! Uncaught TypeError: Cannot read property 'name' of undefined
```

Let's try and just write `getUserName` function in Elm:
```Elm
type alias User =
    { name : String
    , id : Int
    }

getUserName : Int -> List User -> String
getUserName id users =
    let
        user =
            List.Extra.find (\user -> user.id == id) users
    in
        user.name
```

Oh, it doesn't even compile...
```
user does not have a field named name.

The type of user is:

Maybe { name : String, id : Int }

Which does not contain a field named name.
```

Elm does not have the concept of `null` or `undefined`. The most basic type that
accomplishes a similar purpose is `Maybe`. It's defined like this:

```Elm
type Maybe a
  = Just a
  | Nothing
```

We can't just grab the name field, we don't even know if we have a user yet!

Let's fix it!

```elm
getUserName : Int -> List User -> String
getUserName id users =
    let
        user =
            List.Extra.find (\user -> user.id == id) users
    in
        case user of
            Just user ->
                user.name
            Nothing ->
                "Jane Doe"
```

When we declared our function, we said it returns a string, so we have to make
sure it always does! That's why we have a default. If this seems like a lot, we
can reduce it down:

```elm
getUserName : Int -> List User -> String
getUserName id users =
  List.Extra.find ((==) id << .id) users
    |> Maybe.map .name
    |> Maybe.withDefault "Jane Doe"
```

How can I apply this type of thinking in my javascript code?

Well it's hard. At least with plain JS. There are all sorts of places in your
application that you need to remember to check for `null` and `undefined`. There
are tools that can help. Both flow and typescript allow you to do what is called
strict null checks:

```js
function getUser(id: number, users: user): User | undefined {
  return users.find(user => user.id === id);
}

console.log(
  getUser(23, [
    {id: 1, name: 'Foo'},
    {id: 2, name: 'Bar'}
  ])
);
/* Flow and TS will both warn about this now */
```

# Union Types (and simple State Machines!)

Consider the following:

```js
class UserContainer {
  created() {
    this.state.loading = true;

    fetchUser(this.props.id).then(user => {
      this.setState({
        user,
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.loading &&
          <Loading />
        }

        {this.state.user &&
          <ViewUeser user={this.state.user} />
        }

        {this.state.error && // or Maybe this.state.error && !this.state.user...
          <Error message={this.state.error.message} />
        }
      </div>
    );
  }
}

UserContainer.PROPS = {
  id: Config.number().required()
};

UserContainer.STATE = {
  loading: Config.bool.value(false),
  user: Config.object().value(null),
  error: Config.string().value(null)
};
```

Depending on your goal, we have to do a lot of checking to make sure we are
displaying the correct state to the user. And what about Errors? Sometimes we
forget to add error handling, or maybe we forget to reset their state when we
have good data.

How can we do this in Elm? We could start by translating it straight over:

```elm
-- Think of this Model as the STATE for your component.
type alias Model =
    { user : Maybe User
    , loading : Bool
    , error : Maybe String
    }
```

However we still have the same problem, regarding the various possible state. We can do better:

Let's use a union type to describe what we want:

```elm
type RequestData a
    = Loading
    | Done a
    | Error String
```

With this type, we can only be in one of three possible states. Assuming it's
what we want, it's not impossible for us to be done and have data, while also
still loading.

Let's see how this changes our Model:

```elm
-- Much simpler!
type alias Model =
    { user : RequestData User
    }

view : Model -> Html msg
view model =
    case model.user of
        Loading ->
            div [] [ text "Loading..." ]

        Done user ->
            h1 [] [ text user.name ]

        Error message ->
            h1 [ Attr.class "Error" ] [ text message ]
```

This also helps us manage all of these cases better. What happens if I forget to
handle my errors?

```
-- MISSING PATTERNS ------------------------------------------------------------

This `case` does not have branches for all possibilities.

32|>    case user of
33|>        Loading ->
34|>            div [] [ text "Loading..." ]
35|>
36|>        Done user ->
37|>            h1 [] [ text user.name ]

You need to account for the following values:

    Main.Error _

Add a branch to cover this pattern!

If you are seeing this error for the first time, check out these hints:

The recommendations about wildcard patterns and `Debug.crash` are important!

Detected errors in 1 module.
```

Check out `krisajenkins/remotedata`.

Can we apply this to javascript? Well it's much harder. Perhaps higher order
components can help, and careful unit testing.

But this is sort of the point of Elm. If every example here had a perfect
javascript counterpart, Elm probably wouldn't exist.

# Automatic Semantic Versioning


