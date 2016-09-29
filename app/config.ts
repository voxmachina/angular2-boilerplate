export class Config {

    public static getEnvironmentVariable(value) {
        let environment: string;
        let data = {};

        environment = window.location.hostname;

        switch (environment) {
            case "localhost":
                data = {
                    mediumEndpoint: "http://localhost:8080/services/content/public/medium",
                    instagramEndpoint: "http://localhost:8080/services/content/public/instagram",
                    githubEndpoint: "http://localhost:8080/services/content/public/github",
                    devMode: true
                };
                break;
            default:
                data = {
                    mediumEndpoint: "http://igeni.us/api/www/services/content/public/medium",
                    instagramEndpoint: "http://igeni.us/api/www/services/content/public/instagram",
                    githubEndpoint: "http://igeni.us/api/www/services/content/public/github",
                    devMode: false
                };
        }

        return data[value];
    }
}
