const getters = {
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    sidebar: state => state.app.sidebar,
    permission_routers: state => state.permission.routers,
    token : state => state.user.token,
}

export default  getters
