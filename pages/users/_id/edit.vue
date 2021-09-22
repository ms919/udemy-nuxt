<template>
	<div>
		<h3>User Edit</h3>
    <label for="name">name</label>
		<input type="text" id="name" />
    <label for="age">age</label>
    <input type="number" id="age">
	</div>
</template>

<script>
export default {
  data(){
    return{
      name: "",
      age: 0
    }
  },
  beforeCreate(){

  }
}
</script>
