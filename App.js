import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';

const searchString = (s) => {
  return fetch('https://schedulebuilder.umn.edu/api.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ "param": "string", "value": s, "token": "string", "standalone": true, "start": 0, "end": 3, "raw_value": s, "range": false, "multiple": false, "stopwords": [] }]),
  })
    .catch(error => {
      console.warn(error)
    })
}

const classInfo = (classes) => {
  return fetch('https://schedulebuilder.umn.edu/api.php?type=courses&institution=UMNTC&campus=UMNTC&term=1243&crse_ids=' + classes)
    .catch(error => {
      console.warn(error)
    })
}

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (d) => {
    alert(d);
  }

  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <Text>
            Query:
          </Text>
          <input {...register("query")} />
        </label>

        <input type="submit" value="submit" />
      </form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
