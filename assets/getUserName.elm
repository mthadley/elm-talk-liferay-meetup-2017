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
