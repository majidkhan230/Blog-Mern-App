export const RouteSearch = (q) => {
    if (q) {
        return `/search?q=${q}`
    } else {
        return `/search`
    }
  }



  export const RouteBlogDetails = (category, slug) => {
    if (!category || !slug) {
        return '/blog/:category/:slug'
    } else {
        return `/blog/${category}/${slug}`
    }
}