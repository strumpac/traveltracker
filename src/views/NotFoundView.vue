<template>
  <div>
    <img src="/traincrash.jpg">
    <h1>Whoops!</h1>
    <h2>Error 404: File Not Found</h2>
    <h3>Check the URL's spelling, or <RouterLink to="/">go back to the Home Page</RouterLink>.</h3>
  </div>  
</template>

<style scoped>
img{
  width: 60vw;
  height: 40vh;
  object-fit: scale-down;
}
div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
