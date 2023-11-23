import React from "react"
import { FlatList, ScrollView, Text, View } from "react-native"

const SectionsView = ({ sections }: { sections: section[] }) => {
  return (
    // TODO: Implement formatted bulleted points for information
    // Note from Matthew: If anyone knows how to cut down the boilerplate on the format of each jsx element (see below) it would be greatly appreciated!
    <View>
      {sections.map((section) => (
        <View key={section.id?.toString()}>
          {section.instructors.length > 0 && 
            <View>
              <Text>Lecture Type: {section.instruction_mode.description}</Text>
              <Text>Instructors: </Text>
            </View>
          }
          {section.instructors.map((instructor: instructor) => (
                <View key={instructor.name?.toString()}>
                  <Text>  {instructor.name}</Text>
                </View>
          ))}
          
          {section.meeting_patterns.map((meetingPattern: meeting_pattern, idx: number) => (
            meetingPattern.start_time && (
            <View key={idx.toString()}>
              <Text>Meeting Times:</Text>
              <Text>  Starting Time: {meetingPattern.start_time}</Text>
              <Text>  End Time: {meetingPattern.end_time}</Text>
            </View>
            )
          ))
          }
          {section.meeting_patterns.map((meetingPattern: meeting_pattern, idx: number) => (
            meetingPattern.location && (
            <View key={idx.toString()}>
              <Text>Located at {meetingPattern.location.description}</Text>
            </View>
            )
          ))
          }

        </View>
      ))}
    </View>
  );
};



const CoursesView = ({ courses }: { courses: course[] }) => {
  return (
    <View>
      {courses.map((course: course) => (
        <View key={course.id.toString()}>
          <Text>{course.title}</Text>
          <Text>Course ID: {course.id}</Text>
          <ScrollView>
            <SectionsView sections={course.sections} />
          </ScrollView>
        </View>
      ))}
    </View>
  );
};


export default CoursesView