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
