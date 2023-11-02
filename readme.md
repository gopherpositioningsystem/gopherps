The below is a pretty good way to interface with search, see sample_output.json to 

search["courses"][i]["sections"][j]["instructors"][k]["name"]


Notable Issues: 
    //This list is not comprehensive, but look for //TODO: in App.tsx for other places of improvement

    searchString("CSE 1001", 1239)
    // CSE 1001 is considered a request entity too large 

    processSearch(searchString("CSCI 4041", 1239))
    // The processSearch -> FlatList pipeline breaks on duplicate keys (duplicate sections)


    //No current way to figure out what discussion sections are associated with which lecture sections