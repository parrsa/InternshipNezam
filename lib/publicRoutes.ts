export const PUBLIC_ROUTES = [
    '/Resturant-Report',
    // اگر مسیرهای دیگری نیاز دارید
];

export const isPublicRoute = (pathname: string) => {
    const isPublic = PUBLIC_ROUTES.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );
    console.log(`Path: ${pathname}, Is Public: ${isPublic}`);
    return isPublic;
};