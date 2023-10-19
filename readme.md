# Parsing schedule builder's api

Input: https://schedulebuilder.umn.edu/api.php?type=courses&institution=UMNTC&campus=UMNTC&term=1243&crse_ids=11690

Output:


Input: https://schedulebuilder.umn.edu/api.php?type=course&institution=UMNTC&campus=UMNTC&term=1243&subject=CSCI&catalog_nbr=1133

Output:  
        
```json
{
    "complete": true"valid": true"acad_career": "UGRD""id": 809666"institution": "UMNTC""campus": "UMNTC""term": 1243"subject": "CSCI""catalog_nbr": "1133""attributes": [
        
    ]"title": "Introduction to Computing and Programming Concepts""description": [
        0: "Fundamental programming concepts using Python language. Problem solving skills, recursion, object-oriented programming. Algorithm development techniques. Use of abstractions/modularity. Data structures/abstract data types. Develop programs to solve real-world problems."1: "prereq: concurrent registration is required (or allowed) in MATH 1271 or concurrent registration is required (or allowed) in MATH 1371 or concurrent registration is required (or allowed) in MATH 1571H or instr consent"
    ]"credits": "4.00""min_credits": "4.00""max_credits": "4.00""credits_variable": false"schedule_print": true"catalog_print": true"visible": true"equivalents": [
        0: {
        "id": 811072"subject": "CSCI""catalog_nbr": "1133H""visible": true"title": "Honors Introduction to Computing and Programming Concepts"
        }
    ]"sections": [
        0: 590121: 590132: 590143: 590154: 590165: 592586: 593847: 662218: 662229: 5905210: 5905311: 5905412: 5908313: 5998114: 6622315: 5921816: 5921717: 5919918: 5920019: 5920120: 5926721: 5951622: 5955923: 5956024: 5956125: 5998226: 5998327: 6622428: 5975629: 5975730: 59758
    ]
}
```



# the below fetch code works
```JS
const options = {
  method: 'POST',
  headers: {cookie: 'SB2=jr87co58ia3tmprsi48q8ig64k', 'User-Agent': 'insomnia/8.2.0'}
};

fetch('https://schedulebuilder.umn.edu/api.php?type=param_search&institution=UMNTC&campus=UMNTC&term=1243&json=%5B%7B%22param%22%3A%22string%22%2C%22value%22%3A%22your%20mother%22%2C%22token%22%3A%22string%22%2C%22standalone%22%3Atrue%2C%22start%22%3A0%2C%22end%22%3A99%2C%22raw_value%22%3A%22your%20mother%22%2C%22range%22%3Afalse%2C%22multiple%22%3Afalse%2C%22stopwords%22%3A%5B%5D%7D%5D', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

Unformatted JSON param below

```JSON
    [{"param":"string","value":"CSCI 1133","token":"string","standalone":true,"start":0,"end":10,"raw_value":"CSCI 1133","range":false,"multiple":false,"stopwords":[]}]
```


# General Notes
id != crse_nmber != myu_id
end > len(value) 
value is plaintext search query
raw_value = value; 



  




