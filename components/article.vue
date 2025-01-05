<template>
    <div>
        <h1 class="text-white tracking-wider text-6xl text-center p-10">{{ titreElem }}</h1>
        <p class="text-center text-white">{{ contenuElem }}</p>
    </div>
</template>

<script>
    export default{
        name:'articleElem',
        props:["titreElem", "contenuElem"]
    }
</script>

<style scoped>

</style>