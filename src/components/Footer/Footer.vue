<template>
  <div class="footer">
    <ul class="footer__list">
      <li v-for="item in links" :key="item.name" class="footer__item">
        <a :href="item.link" target="_blank" class="footer__link">
          <img :src="item.icon" :alt="item.name">
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import linkedinIcon from '@/assets/img/icons/footer/linkedin.svg';
import githubIcon from '@/assets/img/icons/footer/github.svg';
import emailIcon from '@/assets/img/icons/footer/email.svg';
import telegramIcon from '@/assets/img/icons/footer/telegram.svg';

export default defineComponent({
  name: 'PageFooter',
  setup() {
    const links = ref([
      { name: 'linkedin', icon: linkedinIcon, link: 'https://www.linkedin.com/in/ivan~tsarev/' },
      { name: 'github', icon: githubIcon, link: 'https://github.com/tsarjke' },
      { name: 'email', icon: emailIcon, link: 'mailto:ivantsarb@gmail.com' },
      { name: 'telegram', icon: telegramIcon, link: 'tg://resolve?domain=tsarjke' },
    ]);

    return { links };
  },
});
</script>

<style lang="scss">
.footer {

  &__list {
    display: flex;
    justify-content: center;
    gap: 2rem;

    @media (min-width: 1023px) {
      gap: 3rem;
    }
  }

  &__link {
    display: block;
    width: 3.5rem;
    height: 3.5rem;

    &:hover {
      transform: scale(1.2);
    }

    img {
      width: 100%;
      height: 100%;
    }

    @media (min-width: 1023px) {
      width: 4.5rem;
      height: 4.5rem;
    }
  }
}

</style>
