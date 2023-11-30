 <template>
  <button :class="classes" @click="onFavorite">
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

 <script>
import { favoritesActionTypes } from '@/store/modules/articles/addToFavorites';
export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        btn: true,
        'btn-sm': true,
        'btn-primary': this.isFavoritedOptimistic,
        'btn-outline-primary': !this.isFavoritedOptimistic,
      };
    },
  },

  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  methods: {
    onFavorite() {
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic--;
      } else {
        this.favoritesCountOptimistic++;
      }

      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;

      this.$store.dispatch(favoritesActionTypes.toggleFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      });
    },
  },
};
</script>
