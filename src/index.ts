import Translator, { Replacements } from 'lang.js';
import { catalogue } from './utils/messages';
import { VueConstructor } from 'vue';
import { Options } from './Options';

declare module 'vue/types/vue' {
  interface Vue {
    $_: (key: string, replacements?: Replacements, locale?: string) => string;
    $t: (key: string, replacements?: Replacements, locale?: string) => string;
    $lang: () => Translator;
  }
}

/*
 |--------------------------------------------------------------------------
 | Localization
 |--------------------------------------------------------------------------
 |
 | This wrapper adds localization to your Vue application. It will
 | automatically finds all of your app's translations. If you want,
 | you can ignore some translation files by adding them in the ignore
 | map below.
 |
 */

/**
 * Adds localization to Vue.
 *
 * Example:
 *
 * ```js
 * Vue.use(LangPlugin, {
 *  lang: {
 *    locale: 'en'
 *  }
 * });
 */
export default {
  install: (Vue: VueConstructor, options?: Options) => {
    const opt: Options = {
      ignore: {},
      lang: {
        locale: 'en',
        messages: catalogue(options ? (options.ignore || {}) : {})
      },
      ...options
    };

    const i18n = new Translator(opt.lang);

    Vue.mixin({
      methods: {
        $_: (key: string, replacements?: Replacements, locale?: string) => i18n.get(key, replacements, locale),
        $t: (key: string, replacements?: Replacements, locale?: string) => i18n.get(key, replacements, locale),
        $lang: () => i18n,
      },
    });
  },
};
