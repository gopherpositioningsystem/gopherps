import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
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

    console.log(search)
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