"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const product_route_1 = require("../modules/product/product.route");
const sales_route_1 = require("../modules/sales/sales.route");
const blog_route_1 = require("../modules/blog/blog.route");
const project_route_1 = require("../modules/project/project.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/sales",
        route: sales_route_1.SalesRoutes,
    },
    {
        path: "/blogs",
        route: blog_route_1.BlogRoutes,
    }, {
        path: "/projects",
        route: project_route_1.ProjectRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
