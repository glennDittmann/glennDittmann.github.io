<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-face-man-shimmer"></v-icon>
    </template>
    <template #heading>Glenn Dittmann</template>

    My
    <a href="https://github.com/glennDittmann" target="_blank" rel="noopener">github</a>
    is good way to reach out and collaborate on projects.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-tools"></v-icon>
    </template>
    <template #heading>Tooling</template>

    The stuff around computer science and programm that I like are 
    <a href="https://itch.io/jams" target="_blank" rel="noopener">Game Jams</a>,
    <a href="https://www.youtube.com/watch?v=kjBOesZCoqc" target="_blank" rel="noopener">Linear Algebra</a>,
    <a href="https://thebookofshaders.com/" target="_blank" rel="noopener">Shader</a>, 
    <a href="https://www.rust-lang.org/" target="_blank" rel="noopener">Rust </a>,
    and more !
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-book"></v-icon>
    </template>
    <template #heading>Experience</template>

    I am currently writing my Master Thesis about <em>Approximations of Triangulation Algorithms</em> jointly at the Technische Universitaet Berlin and Humboldt Universitaet zu Berlin. <br>
    Meanwhile I am a working student software enigneer at <a href="https://holoplot.com" target="_blank" rel="noopener">Holoplot.</a> <br>
    Before that, I have worked at <a href="https://maibornwolff.de" target="_blank" rel="noopener">MaibornWolff</a>, 
    the <a href="https://www.informatik.hu-berlin.de/en/forschung-en/gebiete/dbis/" target="_blank" rel="noopener">Chair of Databases and Information Systems</a> 
    and been a working student at <a href="https://www.meine-krankenkasse.de/" target="_blank" rel="noopener">BKK VBU</a> in the field of IT Security.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-mail"></v-icon>
    </template>
    <template #heading>Contact</template>

    Just head over to my github page and leave a message. :) 
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-heart"></v-icon>
    </template>
    <template #heading>Support Me</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>
