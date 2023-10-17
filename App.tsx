import { StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';

// for future use, maps nice names to the codes the api uses
const terms = {
  "Fall 2023": 1239,
  "Spring 2024": 1243,
}

// turn a plain string into json objects the api will take
const buildQuery = (search: String) => {
  return search.split(' ').map(s => {
    return {
      "param": "string",
      "value": s,
      "token": "string",
      "standalone": true,
      "start": 0,
      "end": s.length,
      "raw_value": s,
      "range": false,
      "multiple": false,
      "stopwords": []
    }
  })
}

// search for a class string via the api
const searchString = (s: String, term: string) => {
  return fetch('https://schedulebuilder.umn.edu/api.php?' + new URLSearchParams({
    type: "param_search",
    institution: "UMNTC",
    campus: "UMNTC",
    term: term,
    json: buildQuery(s).toString()
  }), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    }
  })
    .catch(error => {
      console.warn(error)
    })
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
  const { search, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const onSubmit = async data => { console.log(data) }

  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...search("Course", { required: "Please enter your course (i.e. CLA 1001)" })} />
        <input type="submit" />
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