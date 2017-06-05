numbers = Array.fromList [ 1, 2, 3 ]
newNumbers = Array.set 1 26 numbers

Expect.equal newNumbers (Array.fromList [ 1, 26, 3 ])


user = { name = "Foo" , age = 100 }
newUser = { user | name = "Bar" }

Expect.equal user.name "Foo"
Expect.equal newUser.name "Bar"


doubledNumbers = Array.map (\num -> num * 2) numbers

Expect.equal doubledNumbers (Array.fromList [ 2, 4, 6 ])
