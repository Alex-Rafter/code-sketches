'create dictionary'
Dim Dict As New Dictionary(Of String, String)
'add items to dictionary'
Dict.Add(Str, Str2)
'create function that retunrs valib json from dictionary'
Function DictToJson(Dict As Dictionary(Of String, String)) As String
    Dim Json As String = "{"
    For Each Item In Dict
        Json = Json & """" & Item.Key & """: """ & Item.Value & ""","
    Next
    Json = Json.Substring(0, Json.Length - 1) & "}"
    Return Json
End Function
'call function'
MsgBox DictToJson(Dict)
