import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Formik } from 'formik';
import React from 'react';

// for future use, maps nice names to the codes the api uses
const terms = {
  "Fall 2023": 1239,
  "Spring 2024": 1243,
}

// turn a plain string into json objects the api will take
const buildQuery = (search: String) => {
  return search.includes(' ') ?
    search.split(' ').map(s => {
      switch (isNaN(s)) {
        case true:
          return {
            "param": "subject",
            "value": s,
            "token": "subject",
            "standalone": true,
            "start": 0,
            "end": s.length - 1,
            "raw_value": s,
            "range": false,
            "multiple": false,
            "stopwords": []
          }
        case false:
          return {
            "param": "number",
            "value": s,
            "token": "number",
            "standalone": true,
            "start": 0,
            "end": s.length - 1,
            "raw_value": s,
            "range": false,
            "multiple": false,
            "stopwords": []
          }
      }
    })
    :
    {
      "param": "string",
      "value": search,
      "token": "string",
      "standalone": true,
      "start": 0,
      "end": search.length - 1,
      "raw_value": search,
      "range": false,
      "multiple": false,
      "stopwords": []
    }
}

// search for a class string via the api
const searchString = async (s: String, term: string) => {
  return await fetch('https://schedulebuilder.umn.edu/api.php?' + new URLSearchParams({
    type: "param_search",
    institution: "UMNTC",
    campus: "UMNTC",
    term: term,
    json: JSON.stringify(buildQuery(s))
  }), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    }
  })
  // .catch(error => {
  //   console.warn(error)
  // })
}

// get more detailed info about class from id (id can be retrieved from a search)
/*
const classInfo = (classes) => {
  return fetch('https://schedulebuilder.umn.edu/api.php?type=courses&institution=UMNTC&campus=UMNTC&term=1243&crse_ids=' + classes)
    .catch(error => {
      console.warn(error)
    })
}
*/

export default function App() {
  const searchCourse = async (course: String) => {
    const search = await searchString(course, "1239")
    console.log(await search.text())
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ course: 'CLA 1001' }}
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
});