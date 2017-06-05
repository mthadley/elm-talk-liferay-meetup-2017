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
