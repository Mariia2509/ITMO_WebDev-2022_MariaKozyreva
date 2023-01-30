// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    vite:{

    },

        runtimeConfig: {
            public:
            DATA_API: https:jsonplaceholder.typicode.com
            }
        },
            app: {
            pageTransition: { name: 'page', mode: 'out-in' }
},
})



    })
}
