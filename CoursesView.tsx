import React from "react"
import { FlatList, ScrollView, Text, View } from "react-native"

const SectionsView = ({ sections }: { sections: section[] }) => {
  return sections.map((section) => {

    // TODO: display whether class is only online/blended/in person location
    // TODO: display times
    return (
      <View>
        <Text>Instructors:</Text>
        {
          section.instructors.map((instructor: instructor) => {
            return (
              <View>
                <Text>{instructor.name}</Text>
              </View>
            )
          })
        }
      </View>
    )
  })
}

const CoursesView = ({ courses }: { courses: course[] }) => {
  return courses.map((course: course) => {
    return (
      <View>
        <Text>{course.title}</Text>
        <ScrollView>
          <SectionsView key={course.id} sections={course.sections} />
        </ScrollView>
      </View>
    )
  })
}

export default CoursesView