export class Config {

    public static getEnvironmentVariable(value) {
        let environment: string;
        let data = {};

        environment = window.location.hostname;

        switch (environment) {
            case "localhost":
                data = {
                    mediumEndpoint: "http://localhost:8080/services/content/public/medium",
                    devMode: true
                };
                break;
            default:
                data = {
                    mediumEndpoint: "http://igeni.us/api/www/services/content/public/medium",
                    devMode: false
                };
        }

        return data[value];
    }
}
