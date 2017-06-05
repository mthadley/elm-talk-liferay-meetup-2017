module Main exposing (..)

import Html
import MyApp exposing (Model, Msg, init, update, view)


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { init = init
        , view = view
        , update = update
        }
