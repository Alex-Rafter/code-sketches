<script>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello World'
    }
  },
  data() {
    return {
      arr: [],
    }
  },
  beforeMount() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDBPGprJsAUAUBsNM6Lbaz7gZOiucUfelI",
      authDomain: "vue-be-test.firebaseapp.com",
      projectId: "vue-be-test",
      storageBucket: "vue-be-test.appspot.com",
      messagingSenderId: "1040493600090",
      appId: "1:1040493600090:web:f6decaa4984090deaae763"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Get a list of cities from your database
    async function getMeals(db, arr) {
      const mealsCollection = collection(db, 'breakfasts');
      const breakfasts = await getDocs(mealsCollection);
      const breakfastList = breakfasts.docs.map(doc => doc.data());
      const xArr = breakfastList[1].listy
      xArr.forEach(element => arr.push(element))
    }

    getMeals(db, this.arr)
  }
}
</script>

<template>
  <h1>{{msg}}</h1>
  <ul>
    <li v-for="meal in arr">
      {{ meal }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
h1 {
  color: red;
}
</style>