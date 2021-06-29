// creating a app config in which we can set things like default fallback image urls, so other files can access it if needed.
export class AppConfig {
    static fallbackImageURL = `${process.env.PUBLIC_URL}/image-not-found.jpg`;
}