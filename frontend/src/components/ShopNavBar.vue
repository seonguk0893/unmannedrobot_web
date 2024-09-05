<template>
  <nav class="menu">
    <button class="fullscreen" @click="FullScreenMode">
      <img :src="faviconUrl">
    </button>
    <div class="menu-links">
      <div>
        <router-link class="router-link" to="/">Men</router-link>
      </div>
      <div>
        <router-link class="router-link" to="/women">Women</router-link>
      </div>
      <div>
        <router-link class="router-link" to="/liked">Favorites ({{ itemsInLiked }})</router-link>
      </div>
      <div>
        <router-link class="router-link" to="/cart">Cart ({{ itemsInCart }})</router-link>
      </div>
      <div>
        <router-link class="router-link" to="/user">Pay</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShopNavbar",

  data() {
    return {
      showSubMenu: false,
      faviconUrl: `${process.env.BASE_URL}favicon.ico`,
      isFullscreen: false
    };
  },
  methods: {
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu;
    },
    FullScreenMode() {
      if (!this.isFullscreen) {
        let doc = document.documentElement;
        if (doc.requestFullscreen) {
            doc.requestFullscreen();
        } else if (doc.webkitRequestFullscreen) { // Chrome, Safari (webkit)
            doc.webkitRequestFullscreen();
        } else if (doc.mozRequestFullScreen) { // Firefox
            doc.mozRequestFullScreen();
        } else if (doc.msRequestFullscreen) { // IE or Edge
            doc.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari (webkit)
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) { // IE or Edge
            document.msExitFullscreen();
        }
      }
      this.isFullscreen = !this.isFullscreen;
    }
  },
  computed: {
    ...mapGetters(["itemsInCart", "itemsInLiked"]),
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.menu-links {
  display: flex;
  align-items: center;
}

.menu > div {
  margin-right: 20px;
}

.router-link {
  text-decoration: none;
  color: gray;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 10px;
  transition: all 0.3s ease;
}

.router-link:hover {
  color: #217d9c;
}

.router-link-exact-active {
  border: 1px solid #35a2c7;
  color: #35a2c7;
}

button.fullscreen {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 35px;
}

button.fullscreen img {
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
}

button.fullscreen:hover img {
  opacity: 0.7;
}
</style>
