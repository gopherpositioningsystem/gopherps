import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { Formik } from 'formik';
import React, { useState } from 'react';


// for future use, maps nice names to the codes the api uses
const terms = {
  "Fall 2023": 1239,
  "Spring 2024": 1243,
}

// list of data entries, used for placeholder displaying
//const [dataEntries, setDataEntries] = useState([{key: "placehoelder"}])

let dataEntries = [{key: "placeholder"}]

// search for a class string via the api
const searchString = async (s: String, term: String) => {
  let subject
  let course_number

  if (s.includes(' ')) {

    s.split(' ').map(i => {
      //@ts-ignore
      switch (isNaN(i)) {
        case true:
          subject = i
        case false:
          course_number = i
      }
    })

    console.log(subject)
    console.log(course_number)

    //@ts-ignore
    return await fetch('https://courses.umn.edu/campuses/UMNTC/terms/' + term + '/classes.json?q=subject_id=' + subject + ',catalog_number=' + course_number, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    })
  }
}

export default function App() {
  // test function, run after user presses "submit"
  const searchCourse = async (course: String) => {
    // search the course name the user enters with searchString
    const search = await (await searchString(course, "1239"))?.json()

    processSearch(search)
    //console.log(JSON.stringify(search)) //TODO: remove this, it was added for debugging -- Andy
  }

  const processSearch = (search: any) => {
    // TODO: rewrite this in better JS style?? 
    const principleInstructors: any[] = [] // list of principle instructors
    const tempDataEntries = [] // list of data entries


    for (let i =0 ; i<search["courses"].length; i++) {
      for (let j =0 ; j<search["courses"][i]["sections"].length; j++) {
        tempDataEntries.push({key: search["courses"][i]["sections"][j]["component"] + " " + search["courses"][i]["sections"][j]["meeting_patterns"][0]["days"][0]["name"] + " "+ search["courses"][i]["sections"][j]["meeting_patterns"][0]["start_time"] + " - " + search["courses"][i]["sections"][j]["meeting_patterns"][0]["end_time"]})
      } //TODO: only adds first meeting day to dataEntries, need to add all days
    }
    console.log(tempDataEntries)
    //setDataEntries(tempDataEntries)
    dataEntries = tempDataEntries;
  }


  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ course: 'CSCI 4041' }}
        onSubmit={values => searchCourse(values.course)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('course')}
              onBlur={handleBlur('course')}
              value={values.course}
            />
            <Button onPress={handleSubmit} title="Submit" />
            <Text>{dataEntries.join(",")}</Text>

            <FlatList 
              style={styles.flatList} 
              data={dataEntries}
              renderItem={({ item }) => <Text>{item.key}</Text>}  
              />

          </View>
        )}
      </Formik>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    height: 600,
    width: 300,
    backgroundColor: '#c891e3',
    flexGrow: 0
  }
});