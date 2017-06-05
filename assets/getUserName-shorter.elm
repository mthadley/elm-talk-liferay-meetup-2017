getUserName : Int -> List User -> String
getUserName id users =
  List.Extra.find ((==) id << .id) users
    |> Maybe.map .name
    |> Maybe.withDefault "Jane Doe"
