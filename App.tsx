import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Formik } from 'formik';
import React from 'react';

// for future use, maps nice names to the codes the api uses
const terms = {
  "Fall 2023": 1239,
  "Spring 2024": 1243,
}

// turn a plain string into json objects that the api will take
// yes this search format makes no sense, but it is what schedule builder does
const buildQuery = (search: String) => {
  // if the search query includes a space (i.e. "CLA 1001"), split it into a subject ("CLA") and number ("1001")
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
    // otherwise, just search it as a string
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
const searchString = async (s: String, term: String) => {
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
}

// get more detailed info about class from id (id can be retrieved from a search)
const classInfo = async (classId: String, term: Number) => {
  return await fetch('https://schedulebuilder.umn.edu/api.php?type=courses&institution=UMNTC&campus=UMNTC&term=1243&crse_ids=' + classId)
}

export default function App() {
  const searchCourse = async (course: String) => {
    const search: [{ "id": Number, "sections": Number[] }] = await (await searchString(course, "1239")).json()
    const courseInfo = await (await classInfo(search[0].id.toString(), 1239)).json()
    console.log(courseInfo)
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