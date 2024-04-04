<template>
    <div class="wrapperSite">
       
       <Entete/>
       <StyleSheet/>
        <ArticleElem
          titreElem = "Yllan SUTTER"
          contenuElem = "Créateur de sites internet"
        />
       
        <!-- http://localhost:3000/_tailwind/ 
        https://tailwindcss.com/docs/gap-->
        
        
    </div>
</template>

<script>


  import StyleSheet from '~/components/StyleSheet';
  import ArticleElem from '~/components/article';
  import Entete from '~/components/entete';

  let lists;

  export default{
    
    components:{
      StyleSheet,
      ArticleElem,
      Entete
    },
    data: {
    isActive: false,
      lists: ["Vue", "Angular", "React"],
  },
   methods : {
        randomNumber : function(){
          var size = arr.length;
          var elem = Math.floor(Math.random() * (size - 1 + 1)) + 0;

          var ElemFinal = arr[elem];
          arr.splice(elem,1);

          return ElemFinal;
        },
        affichage : function(){
          this.isActive = !this.isActive;
        },
      },
  }

//------------------------------SHUFFLE--------------------------------------//

    var arr = [1,2,3,4,5,6,7,8,9,10,12,14,20,25,30,35,40,45,50,75,100,150,200,300];
  
  shuffle(arr);

  function shuffle(array) 
  {
    arr = [1,2,3,4,5,6,7,8,9,10,12,14,20,25,30,35,40,45,50,75,100,150,200,300];
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
</script>
