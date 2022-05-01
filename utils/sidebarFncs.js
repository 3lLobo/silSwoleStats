

export const getActiveRoute = (routes, router) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].collapse) {
            let collapseActiveRoute = getActiveRoute(routes[i].views);
            if (collapseActiveRoute !== activeRoute) {
                return collapseActiveRoute;
            }
        } else if (routes[i].category) {
            let categoryActiveRoute = getActiveRoute(routes[i].views);
            if (categoryActiveRoute !== activeRoute) {
                return categoryActiveRoute;
            }
        } else {
            if (
                router?.pathname.indexOf(routes[i].path) !== -1
            ) {
                return routes[i].name;
            }
        }
    }
    return activeRoute;
};

// This changes navbar state(fixed or not)
// router comes from useRouter() hook. Use this function within a useEffect hook.
export const getActiveNavbar = (routes, router) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].category) {
            let categoryActiveNavbar = getActiveNavbar(routes[i].views);
            if (categoryActiveNavbar !== activeNavbar) {
                return categoryActiveNavbar;
            }
        } else {
            if (
                router?.pathname.indexOf(routes[i].path) !== -1
            ) {
                if (routes[i].secondaryNavbar) {
                    return routes[i].secondaryNavbar;
                }
            }
        }
    }
    return activeNavbar;
};