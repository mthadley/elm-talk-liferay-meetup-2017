length : List a -> ( Int, String )
length items =
    ( List.length items, "Just doing some measuring..." )


items =
    [ 1, 2, 3 ]


test =
    Expect.equal (length items) ( 3, "Jest doing some measuring..." )
