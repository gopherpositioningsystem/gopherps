import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { Formik } from 'formik';
import React from 'react';


// for future use, maps nice names to the codes the api uses
const terms = {
  "Fall 2023": 1239,
  "Spring 2024": 1243,
}

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

    processSearches(search)
    //console.log(JSON.stringify(search)) //TODO: remove this, it was added for debugging -- Andy
  }

  const processSearches = (search: any) => {
    // TODO: rewrite this in better JS style?? 
    const principleInstructors = [] // list of principle instructors
    const dataEntries = [] // list of data entries

    

    let sectionInstructors = [] //= search["courses"][0]["sections"][0]["instructors"][0]["name"]

    for (let i = 0; i < search["courses"].length; i++) {
      for (let j = 0; j < search["courses"][i]["sections"].length; j++) {
        for (let k = 0; k < search["courses"][i]["sections"][j]["instructors"].length; k++) {

          sectionInstructors.push(search["courses"][i]["sections"][j]["instructors"][k]["name"]);
        }
          dataEntries.push(sectionInstructors + " " + search["courses"][i]["sections"][j]["component"])
      }
    }

    console.log(dataEntries)
    //console.log(JSON.stringify(search))
  }


  return (
    <View style={styles.container}>
      <FlatList style={styles.flatList}
        data={[
          { key: 'Devin' },
          { key: 'Dan' },
          { key: 'Dominic' },
          { key: 'Jackson' },
          { key: 'James' },
          { key: 'Joel' },
          { key: 'John' },
          { key: 'Jillian' },
          { key: 'Jimmy' },
          { key: 'Julie' },
        ]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />


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